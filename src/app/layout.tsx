import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeLayout } from "@/shared/layout/themeLayout";
import StoreProvider from "./ StoreProvider";
import { Suspense } from "react";
import Script from "next/script";
import Image from "next/image";

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
        <Script
          type="text/javascript"
          id="metrika-counter"
          strategy="afterInteractive"
        >
          {`     (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(98874174, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
`}
        </Script>
        <noscript>
          {
            <div>
              <Image
                src="https://mc.yandex.ru/watch/98874174"
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          }
        </noscript>
        <AntdRegistry>
          <ThemeLayout>
            <StoreProvider>
              <Suspense>{children}</Suspense>
            </StoreProvider>
          </ThemeLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
