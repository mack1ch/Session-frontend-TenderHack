import Link from "next/link";
import styles from "./ui.module.scss";
import { Tag } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

export const QuotationSessionCard = () => {
  return (
    <>
      <article className={styles.sessionCard}>
        <span className={styles.divider} />
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.header}>
              <span className={styles.circle} />
              <p className={styles.id}>17ada75f</p>
              <div className={styles.errorTags}>
                <Tag color="magenta">дублирующая</Tag>
              </div>
            </div>
            <div className={styles.main}>
              <Link className={styles.sessionName} href="/">
                Грунтовка Бетон-Контакт 20 кг
              </Link>
            </div>
            <div className={styles.footer}>
              <p className={styles.businessName}>
                ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ ГОРОДА МОСКВЫ ЖИЛИЩНИК
                РАЙОНА ПРЕОБРАЖЕНСКОЕ
              </p>
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
