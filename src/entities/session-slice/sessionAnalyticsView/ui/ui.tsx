import { IAuctionDetail } from "@/shared/interface/auctionById";
import styles from "./ui.module.scss";
import { CSSProperties, useEffect, useState } from "react";
import {
  EAuctionCheckResult,
  IAuctionCheck,
} from "@/shared/interface/auctionCheck";
import { Button, message, Spin } from "antd";
import { postSessionsURLToCheck } from "../api";
export const SessionAnalyticsView = ({
  session,
  style,
}: {
  session?: IAuctionDetail;
  style?: CSSProperties;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [auctionCheck, setAuctionCheck] = useState<IAuctionCheck>();

  const fetchAuctionCheck = async () => {
    setIsLoading(true);
    if (session?.id) {
      message.success("Загрузка началась");
      const res = await postSessionsURLToCheck(
        "https://zakupki.mos.ru/auction/" + session?.id
      );
      if (res) {
        setAuctionCheck(res);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <section style={style} className={styles.analyticsView}>
        {!isLoading && auctionCheck ? (
          <>
            {auctionCheck &&
              Object.keys(auctionCheck.result)
                .filter(
                  (key) =>
                    auctionCheck?.result[
                      key as keyof typeof auctionCheck.result
                    ] === false
                )
                .map((key, index) => (
                  <article key={index} className={styles.analyticsCard}>
                    <h4 className={styles.h4}>
                      {
                        EAuctionCheckResult[
                          key as keyof typeof EAuctionCheckResult
                        ]
                      }
                    </h4>
                  </article>
                ))}
          </>
        ) : isLoading ? (
          <div className={styles.loader}>
            <Spin size="large" />
            <p className={styles.p}>Проверяем...</p>
          </div>
        ) : (
          <div className={styles.loader}>
            <Button onClick={fetchAuctionCheck} size="large" type="primary">
              Начать проверку
            </Button>
          </div>
        )}
      </section>
    </>
  );
};
