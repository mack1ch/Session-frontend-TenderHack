import { CheckInput } from "@/entities/search-slice/checkInput";
import styles from "./ui.module.scss";
import { Empty } from "antd";

export const CheckTab = () => {
  return (
    <>
      <section className={styles.checkTabWrap}>
        <CheckInput />
        <div className={styles.contentWrap}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Empty description="Введите ссылку на сессию"></Empty>
          </div>
        </div>
      </section>
    </>
  );
};
