import { IAuctionDetail } from "@/shared/interface/auctionById";
import styles from "./ui.module.scss";
import { CSSProperties } from "react";
export const SessionAnalyticsView = ({
  session,
  style,
}: {
  session?: IAuctionDetail;
  style?: CSSProperties;
}) => {
  return (
    <>
      <section style={style} className={styles.analyticsView}>
        <article className={styles.analyticsCard}>{session?.name}</article>
      </section>
    </>
  );
};
