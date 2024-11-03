import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeLayout } from "@/shared/layout/themeLayout";

const RF_Dewi = localFont({
  src: [
    {
      path: "../../public/font/RFDewi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/RFDewi-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/RFDewi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Inverse.Sessions",
  description: "Inverse.Sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${RF_Dewi.className}`}>
        <AntdRegistry>
          <ThemeLayout>{children}</ThemeLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
