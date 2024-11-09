import styles from "./ui.module.scss";
import { Skeleton, Tag, Tooltip } from "antd";
import { IAuctionDetail } from "@/shared/interface/auctionById";
import Link from "next/link";
import { CheckCircleOutlined } from "@ant-design/icons";
import { IHistory } from "@/shared/interface/history";
import { useEffect } from "react";
import { changeSessionUnPublishFilterValue } from "../api";
export const SessionViewHeader = ({
  session,
  isLoading,
  history,
}: {
  session?: IAuctionDetail;
  isLoading: boolean;
  history?: IHistory[];
}) => {
  const isAuctionInHistory =
    session && history
      ? history.map((item) => item.auctionId === session.id)
      : false;

  useEffect(() => {
    const addToHistory = async () => {
      await changeSessionUnPublishFilterValue(session?.id);
    };
    if (session) {
      addToHistory();
    }
  }, [session]);

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
            <div className={styles.row}>
              <Link
                target="_blank"
                href={`https://zakupki.mos.ru/auction/${session?.id}`}
                className={styles.h1}
              >
                {session?.name.toLowerCase()}
              </Link>
              {isAuctionInHistory && (
                <Tooltip title="Вы уже проверяли эту котировочную сессию">
                  <CheckCircleOutlined
                    style={{ fontSize: "30px", color: "#1874cf" }}
                  />
                </Tooltip>
              )}
            </div>
          </>
        )}
      </header>
    </>
  );
};
