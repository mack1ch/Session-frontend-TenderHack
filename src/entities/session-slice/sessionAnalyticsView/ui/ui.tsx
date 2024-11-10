import { IAuctionDetail } from "@/shared/interface/auctionById";
import styles from "./ui.module.scss";
import { CSSProperties, useEffect, useState } from "react";
import { IAuctionCheck } from "@/shared/interface/auctionCheck";
import { Skeleton, Spin } from "antd";
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
          <article className={styles.analyticsCard}></article>
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
