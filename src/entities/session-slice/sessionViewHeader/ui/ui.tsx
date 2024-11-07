import styles from "./ui.module.scss";
import { Skeleton, Tag } from "antd";
import { IAuctionDetail } from "@/shared/interface/auctionById";
export const SessionViewHeader = ({
  session,
  isLoading,
}: {
  session?: IAuctionDetail;
  isLoading: boolean;
}) => {
  return (
    <>
      <header className={styles.header}>
        {isLoading ? (
          <>
            <div style={{ gap: "8px" }} className={styles.tagsWrap}>
              <Skeleton.Button size="small" />
              <Skeleton.Button size="small" />
              <Skeleton.Button size="small" />
              <Skeleton.Button size="small" />
              <Skeleton.Button size="small" />
            </div>
            <Skeleton.Input block />
          </>
        ) : (
          <>
            <div className={styles.tagsWrap}>
              <Tag color="magenta">дублирующая</Tag>{" "}
              <Tag color="magenta">дублирующая</Tag>{" "}
              <Tag color="magenta">дублирующая</Tag>{" "}
              <Tag color="magenta">дублирующая</Tag>{" "}
              <Tag color="magenta">дублирующая</Tag>
            </div>
            <h1 className={styles.h1}>{session?.name}</h1>
          </>
        )}
      </header>
    </>
  );
};
