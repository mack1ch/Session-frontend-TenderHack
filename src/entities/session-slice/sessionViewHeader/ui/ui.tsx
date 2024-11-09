import styles from "./ui.module.scss";
import { Skeleton, Tag, Tooltip } from "antd";
import { IAuctionDetail } from "@/shared/interface/auctionById";
import Link from "next/link";
import { CheckCircleOutlined } from "@ant-design/icons";
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
            <div className={styles.row}>
              <Link
                target="_blank"
                href={`https://zakupki.mos.ru/auction/${session?.id}`}
                className={styles.h1}
              >
                {session?.name.toLowerCase()}
              </Link>
              <Tooltip title="Иконка галочки означает, что вы уже проверяли эту котировочную сессию">
                <CheckCircleOutlined
                  style={{ fontSize: "30px", color: "#1874cf" }}
                />
              </Tooltip>
            </div>
          </>
        )}
      </header>
    </>
  );
};
