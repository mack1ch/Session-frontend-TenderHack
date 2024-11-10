import { IAuctionDetail } from "@/shared/interface/auctionById";
import styles from "./ui.module.scss";
import { CSSProperties, useEffect, useState } from "react";
import {
  EAuctionCheckResult,
  IAuctionCheck,
} from "@/shared/interface/auctionCheck";
import { Spin } from "antd";
import { postSessionsURLToCheck } from "../api";
export const SessionAnalyticsView = ({
  session,
  style,
}: {
  session?: IAuctionDetail;
  style?: CSSProperties;
}) => {
  const [auctionCheck, setAuctionCheck] = useState<IAuctionCheck>();
  useEffect(() => {
    const fetchAuctionCheck = async () => {
      if (session?.id) {
        const res = await postSessionsURLToCheck(
          "https://zakupki.mos.ru/auction/" + session?.id
        );
        if (res) {
          setAuctionCheck(res);
        }
      }
    };
    fetchAuctionCheck();
  }, [session]);
  return (
    <>
      <section style={style} className={styles.analyticsView}>
        {auctionCheck ? (
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
        ) : (
          <div className={styles.loader}>
            <Spin size="large" />
            <p className={styles.p}>Проверяем...</p>
          </div>
        )}
      </section>
    </>
  );
};
