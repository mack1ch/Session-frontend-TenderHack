"use client";

import { CheckInput } from "@/entities/search-slice/checkInput";
import styles from "./ui.module.scss";
import { Button, Empty, message, Progress } from "antd";
import { useState } from "react";
import { postSessionsURLToCheck } from "../api";

export const CheckTab = () => {
  const [sessionLinks, setSessionLinks] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const processUrlsSequentially = async (urls: string[]) => {
    setLoading(true);
    for (let i = 0; i < urls.length; i++) {
      await postSessionsURLToCheck(urls[i]);
      setProgress(Math.round(((i + 1) / urls.length) * 100));
    }
    setLoading(false);
  };

  const handleStartChecking = () => {
    if (sessionLinks.length > 0) {
      processUrlsSequentially(sessionLinks);
    } else {
      message.warning("Добавьте хотя бы один URL для проверки");
    }
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
          <Progress
            percent={progress}
            status={progress < 100 ? "active" : "success"}
          />
        )}
        <div className={styles.contentWrap}>
          {!loading && sessionLinks.length === 0 && (
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
          )}
        </div>
      </section>
    </>
  );
};
