import styles from "./ui.module.scss";
import { TabItem } from "../tabItem";
import { DSearchTabItems } from "../data";
import { useState } from "react";

export const MainTab = () => {
  const [activeTabValue, setActiveTabValue] = useState<string>(
    DSearchTabItems[0].value
  );
  const getContentForTab = () => {
    const activeTab = DSearchTabItems.find(
      (tabItem) => tabItem.value === activeTabValue
    );
    return activeTab ? activeTab.content : null;
  };

  return (
    <>
      <section className={styles.searchTabLayout}>
        <h1 className={styles.h1}>Недобросовестные сессии</h1>
        <header className={styles.tags}>
          {DSearchTabItems.map((tabItem, index) => (
            <TabItem
              style={{
                background:
                  activeTabValue === tabItem.value ? "#DB2B21" : undefined,
                color: activeTabValue === tabItem.value ? "#fff" : undefined,
              }}
              onClick={() => setActiveTabValue(tabItem.value)}
              tabItem={tabItem}
              key={index}
            />
          ))}
        </header>
        <div className={styles.preview}>{getContentForTab()}</div>
      </section>
    </>
  );
};
