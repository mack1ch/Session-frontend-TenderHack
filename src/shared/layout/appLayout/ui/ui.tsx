import { CSSProperties } from "react";
import styles from "./ui.module.scss";

export const AppLayout = ({
  children,
  style,
}: Readonly<{
  children: React.ReactNode;
  style?: CSSProperties;
}>) => {
  return (
    <>
      <main style={style} className={styles.main}>
        {children}
      </main>
    </>
  );
};
