import { Checkbox } from "antd";
import styles from "./ui.module.scss";

export const SessionsUnPublishFilters = () => {
  return (
    <>
      <section className={styles.filtersLayout}>
        <h2 className={styles.h2}>Фильтры для проверки</h2>
        <div className={styles.filters}>
          <Checkbox>Проверка на дублирующие сессии</Checkbox>
          <Checkbox>Проверка наличия требования обеспечения заявок </Checkbox>
          <Checkbox>Проверка соответствия спецификации с Проектом КС</Checkbox>
          <Checkbox>Проверка карточек оферт на набор товаров</Checkbox>
          <Checkbox>
            Проверка правильности введенных данных Заказчика (ИНН, КПП и тп){" "}
          </Checkbox>
          <Checkbox>
            Проверка Заказчика по 44-ФЗ (не должен иметь задолжностей, не должен
            являться иноагентом, не должен принадлежать к офшорным компаниям)
          </Checkbox>
        </div>
      </section>
    </>
  );
};
