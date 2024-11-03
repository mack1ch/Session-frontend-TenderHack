import { ConfigProvider, ThemeConfig } from "antd";

export const ThemeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <ConfigProvider theme={themeContext}>{children}</ConfigProvider>
    </>
  );
};

export const themeContext: ThemeConfig = {
  token: {
    colorPrimary: "#DB2B21",
  },
};
