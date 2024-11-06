import { ConfigProvider, ThemeConfig } from "antd";
import ruRU from "antd/locale/ru_RU";

export const ThemeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <ConfigProvider locale={ruRU} theme={themeContext}>
        {children}
      </ConfigProvider>
    </>
  );
};

export const themeContext: ThemeConfig = {
  token: {
    colorPrimary: "#DB2B21",
  },
};
