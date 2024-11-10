import styles from "./ui.module.scss";
import { Button, message, Skeleton, Tag, Tooltip } from "antd";
import { IAuctionDetail } from "@/shared/interface/auctionById";
import Link from "next/link";
import { CheckCircleOutlined } from "@ant-design/icons";
import { IHistory } from "@/shared/interface/history";

import { changeSessionUnPublishFilterValue } from "../api";
import { useEffect, useState } from "react";
export const SessionViewHeader = ({
  session,
  isLoading,
  history,
}: {
  session?: IAuctionDetail;
  isLoading: boolean;
  history?: IHistory[];
}) => {
  const [isAuctionInHistory, setIsAuctionInHistory] = useState<boolean>(false);

  useEffect(() => {
    setIsAuctionInHistory(
      session && history
        ? history
            .map((historyItem) => Number(historyItem.auctionId))
            .includes(session.id)
        : false
    );
  }, [session, history]);

  const addToHistory = async () => {
    const res = await changeSessionUnPublishFilterValue(session?.id);
    if (res) {
      message.success(
        'Котировочная сессия успешно перенесе в раздел "Просмотренные"'
      );
      setIsAuctionInHistory(true);
    }
  };

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
        
            <div className={styles.row}>
              <div className={styles.header}>
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
              {!isAuctionInHistory && (
                <Button onClick={addToHistory} type="primary">
                  Отметить прочитанной
                </Button>
              )}
            </div>
          </>
        )}
      </header>
    </>
  );
};
