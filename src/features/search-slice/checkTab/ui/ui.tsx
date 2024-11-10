"use client";

import { CheckInput } from "@/entities/search-slice/checkInput";
import styles from "./ui.module.scss";
import { Button, Empty, message, Progress } from "antd";
import { useEffect, useState } from "react";
import { postSessionsURLToCheck } from "../api";
import { QuotationSessionCard } from "@/entities/session-slice/sessionCard";
import { IAuctionCheck } from "@/shared/interface/auctionCheck";
import { CloseOutlined } from "@ant-design/icons";

export const CheckTab = () => {
  const [sessionLinks, setSessionLinks] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cancelCheck, setCancelCheck] = useState(false);
  const [checkedAuctions, setCheckedAuctions] = useState<IAuctionCheck[]>();

  const processUrlsSequentially = async (urls: string[]) => {
    setLoading(true);
    setCancelCheck(false);
    const startTime = Date.now();

    for (let i = 0; i < urls.length; i++) {
      if (!cancelCheck) {
        const res = await postSessionsURLToCheck(urls[i]);
        if (res) {
          setCheckedAuctions((prev) => (prev ? [...prev, res] : [res]));
        }

        setProgress(Math.round(((i + 1) / urls.length) * 100));
      }
    }

    setLoading(false);
    const endTime = Date.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    message.info(`Проверка завершена за ${timeTaken} секунд`);
    setProgress(0);
  };

  useEffect(() => {
    if (cancelCheck) {
      message.info("Проверка была отменена");
      setProgress(0);
      setLoading(false);
      setCancelCheck(false);
    }
  }, [cancelCheck]);

  const handleStartChecking = () => {
    if (sessionLinks.length > 0) {
      processUrlsSequentially(sessionLinks);
    } else {
      message.warning("Добавьте хотя бы один URL для проверки");
    }
  };

  const handleCancelChecking = () => {
    setCancelCheck(true);
    setLoading(false);
    setProgress(0);
  };

  return (
    <>
      <section className={styles.checkTabWrap}>
        <CheckInput
          sessionLinks={sessionLinks}
          setSessionLinks={setSessionLinks}
        />
        <Button
          size="large"
          type="primary"
          style={{ marginTop: "12px" }}
          onClick={handleStartChecking}
          loading={loading}
        >
          {loading ? "Проверка..." : "Начать проверку"}
        </Button>
        {loading && (
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "12px" }}
          >
            <Progress
              percent={progress}
              status={progress < 100 ? "active" : "success"}
              style={{ flex: 1 }}
            />

            <Button
              style={{ marginLeft: "12px" }}
              shape="circle"
              type="text"
              onClick={handleCancelChecking}
              icon={<CloseOutlined />}
            />
          </div>
        )}
        <div className={styles.cardsWrap}>
          {checkedAuctions?.map((checkedAuction) => (
            <QuotationSessionCard
              auctionChecked={checkedAuction}
              isRead={false}
              auction={checkedAuction.auction}
              key={checkedAuction.auction.id}
            />
          ))}
        </div>
        {!loading && sessionLinks.length === 0 && (
          <div className={styles.contentWrap}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Empty description="Введите ссылку на сессию"></Empty>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
