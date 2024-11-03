import Link from "next/link";
import styles from "./ui.module.scss";
import { Tag } from "antd";
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
              <p className={styles.id}>{auction.number}</p>
              <div className={styles.errorTags}>
                <Tag color="magenta">дублирующая</Tag>
              </div>
            </div>
            <div className={styles.main}>
              <Link className={styles.sessionName} href="/">
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
            <p className={styles.typeOfSession}>44-ФЗ</p>
            <h5 className={styles.cost}>₽35.795</h5>
            <p className={styles.dataOfTheSessionEnd}>
              Окончание приема заявок: 28.04.2022 в 15:12
            </p>
            <p className={styles.region}>
              <EnvironmentOutlined style={{ color: "#757575" }} />
              77. г. Москва
            </p>
          </div>
        </div>
      </article>
    </>
  );
};
