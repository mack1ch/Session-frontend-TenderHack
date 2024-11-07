import { CSSProperties } from "react";
import styles from "./ui.module.scss";
import { IAuctionDetail } from "@/shared/interface/auctionById";
import { Skeleton } from "antd";
export const SessionAuctionView = ({
  session,
  style,
  isLoading,
}: {
  session?: IAuctionDetail;
  style?: CSSProperties;
  isLoading: boolean;
}) => {
  return (
    <>
      <section style={style} className={styles.customerView}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <div className={styles.infoOfAuctionWrap}>
              <div className={styles.infoOfAuctionItem}>
                <h2 className={styles.h2_withFirstLetterUpperCase}>
                  {session?.customer?.name?.toLowerCase()}
                </h2>
              </div>
              {session?.auctionRegion?.map((auctionRegion) => (
                <div
                  key={auctionRegion.id}
                  className={styles.infoOfAuctionItem}
                >
                  <span className={styles.h2__title}>Регион:</span>{" "}
                  <h2 className={styles.h2}>
                    {auctionRegion?.name?.toLowerCase()}
                  </h2>
                </div>
              ))}
              <div className={styles.infoOfAuctionItem}>
                <span className={styles.h2__title}>Причина заключения:</span>{" "}
                <h2 className={styles.h2}>
                  {session?.conclusionReasonName?.toLowerCase()} (
                  {session?.federalLawName})
                </h2>
              </div>
            </div>
            <div className={styles.lots}>
              {session?.items?.map((item) => (
                <article className={styles.itemCard} key={item.id}>
                  <div className={styles.left}>
                    <div className={styles.columnWith4Gap}>
                      <h3 className={styles.h3}>{item?.name?.toLowerCase()}</h3>
                      <p className={styles.direction}>
                        {item.productionDirectoryName}
                      </p>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <h2 className={styles.cost}>
                      {item.costPerUnit.toLocaleString(`ru-RU`, {
                        style: "currency",
                        currency: "RUB",
                      })}
                    </h2>
                    <p className={styles.currentValue}>
                      {item.currentValue} {item?.okeiName}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};
