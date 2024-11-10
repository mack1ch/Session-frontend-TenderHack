import Link from "next/link";
import styles from "./ui.module.scss";
import { Button, Tag, Tooltip } from "antd";
import { CheckCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { IAuction } from "@/shared/interface/auction";
import { CancelModal } from "../cancelModal";
import { useState } from "react";
import {
  EAuctionCheckResult,
  IAuctionCheck,
} from "@/shared/interface/auctionCheck";

export const QuotationSessionCard = ({
  auction,
  tabItemID = "check",
  isRead = false,
  auctionChecked,
}: {
  auction: IAuction;
  isRead: boolean;
  tabItemID?: string;
  auctionChecked?: IAuctionCheck;
}) => {
  const result = auctionChecked?.result;
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  return (
    <>
      <CancelModal
        isOpen={isCancelModalOpen}
        session={auction}
        setIsOpen={setIsCancelModalOpen}
      />
      <article className={styles.sessionCard}>
        <span className={styles.divider} />
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.header}>
              <span className={styles.circle} />
              <p className={styles.id}>
                {auction.auctionId} | {auction.federalLawName}
              </p>
              <div className={styles.errorTags}>
                {result &&
                  Object.keys(result)
                    .filter(
                      (key) =>
                        result[key as keyof typeof result]?.status === false
                    )
                    .map((key) => (
                      <Tag color="magenta" key={key}>
                        {
                          EAuctionCheckResult[
                            key as keyof typeof EAuctionCheckResult
                          ]
                        }
                      </Tag>
                    ))}
              </div>
            </div>
            <div className={styles.main}>
              <Link
                style={{ color: isRead ? "#70BDFF" : undefined }}
                className={styles.sessionName}
                href={`/session/${auction.auctionId}?activeTabItem=${tabItemID}`}
              >
                {auction.name.toLowerCase()}
              </Link>
              {isRead && (
                <Tooltip title="Вы уже проверяли эту котировочную сессию">
                  <CheckCircleOutlined style={{ color: "#70BDFF" }} />
                </Tooltip>
              )}
            </div>
            <div className={styles.footer}>
              {auction?.customers?.map((customer) => (
                <p key={customer.id} className={styles.businessName}>
                  {customer.name.toLowerCase()}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.row}>
              <Button
                onClick={() => setIsCancelModalOpen(true)}
                type="primary"
                size="middle"
              >
                Отменить
              </Button>
              {/* <Button size="middle">Отметить проверенной</Button> */}
            </div>
            <p className={styles.regionAndDate}>
              <EnvironmentOutlined style={{ color: "#757575" }} />
              {auction.regionName}
              {auction.beginDate?.split(" ")[0]
                ? `, от ${auction.beginDate?.split(" ")[0]}`
                : ""}
            </p>
          </div>
        </div>
      </article>
    </>
  );
};
