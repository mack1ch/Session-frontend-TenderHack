import Link from "next/link";
import styles from "./ui.module.scss";
import { Button, Tag } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { IAuction } from "@/shared/interface/auction";
import { CancelModal } from "../cancelModal";
import { useState } from "react";

export const QuotationSessionCard = ({
  auction,
  tabItemID = "check",
}: {
  auction: IAuction;
  tabItemID?: string;
}) => {
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
                <Tag color="magenta">дублирующая</Tag>
              </div>
            </div>
            <div className={styles.main}>
              <Link
                className={styles.sessionName}
                href={`/session/${auction.auctionId}?activeTabItem=${tabItemID}`}
              >
                {auction.name.toLowerCase()}
              </Link>
            </div>
            <div className={styles.footer}>
              {auction.customers.map((customer) => (
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
