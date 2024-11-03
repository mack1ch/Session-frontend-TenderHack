import styles from "./ui.module.scss";
import { ISearchTabItem } from "../../interface";
import { CSSProperties } from "react";

export const TabItem = ({
  tabItem,
  onClick,
  style,
}: {
  tabItem: ISearchTabItem;
  onClick?: (value: string) => void;
  style?: CSSProperties;
}) => {
  return (
    <>
      <button
        onClick={() => onClick && onClick(tabItem.value)}
        style={style}
        className={styles.tabItem}
      >
        {tabItem.icon} {tabItem.label}
      </button>
    </>
  );
};
