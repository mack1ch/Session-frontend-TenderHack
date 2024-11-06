import Link from "next/link";
import styles from "./ui.module.scss";
import { Button, Tag } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { IAuction } from "@/shared/interface/auction";

export const QuotationSessionCard = ({ auction }: { auction: IAuction }) => {
  return (
    <>
      <article className={styles.sessionCard}>
        <span className={styles.divider} />
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.header}>
              <span className={styles.circle} />
              <p className={styles.id}>
                {auction.number} | {auction.federalLawName}
              </p>
              <div className={styles.errorTags}>
                <Tag color="magenta">дублирующая</Tag>
              </div>
            </div>
            <div className={styles.main}>
              <Link
                className={styles.sessionName}
                href={`/session/${auction.number}`}
              >
                {auction.name}
              </Link>
            </div>
            <div className={styles.footer}>
              {auction.customers.map((customer) => (
                <p key={customer.id} className={styles.businessName}>
                  {customer.name}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.row}>
              <Button type="primary" size="middle">
                Отменить
              </Button>
              <Button size="middle">Отменить позже</Button>
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
