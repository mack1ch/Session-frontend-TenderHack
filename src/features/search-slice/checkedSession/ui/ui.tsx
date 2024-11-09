import useSWR from "swr";
import styles from "./ui.module.scss";
import { IDetailedHistory } from "@/shared/interface/history";
import { fetcher } from "@/shared/api";
import { QuotationSessionCard } from "@/entities/session-slice/sessionCard";
import { Result, Spin } from "antd";

export const CheckedSession = () => {
  const {
    data: fetchHistoryAuction,
    error,
    isLoading,
  } = useSWR<IDetailedHistory>(`/viewed_history/detailed/`, fetcher);
  return (
    <>
      <section className={styles.checkedSessionWrap}>
        {fetchHistoryAuction?.items.map((auction) => (
          <QuotationSessionCard
            key={auction.auctionId}
            auction={auction}
            isRead={true}
            tabItemID="checked"
          />
        ))}
        {error && (
          <Result
            status="error"
            title="Ошибка на сервере"
            subTitle="Обратитесь к разработчику и поменяйте настройки"
          />
        )}
        {isLoading && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              marginTop: "64px",
              justifyContent: "center",
            }}
          >
            <Spin size="large" />
          </div>
        )}
      </section>
    </>
  );
};
