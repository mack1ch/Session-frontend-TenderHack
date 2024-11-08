import { CheckInput } from "@/entities/search-slice/checkInput";
import styles from "./ui.module.scss";

export const CheckTab = () => {
  return (
    <>
      <section className={styles.checkTabWrap}>
        <CheckInput />
      </section>
    </>
  );
};
