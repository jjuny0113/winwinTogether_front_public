import Providers from "@/util/reactQuery/Provider";
import "./globals.css";
import localFont from "next/font/local";
import { Metadata } from "next";
import Script from "next/script";

const pretendard = localFont({
  src: [
    {
      path: "./asset/fonts/Pretendard-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./asset/fonts/Pretendard-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./asset/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./asset/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./asset/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./asset/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./asset/fonts/Pretendard-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./asset/fonts/Pretendard-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    default: "윈윈투게더 ",
    template: "윈윈투게더 | %s",
  },
  description: "위너님의 든든한 파트너 윈윈투게더!!",
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.className}>
      <Script
        id="hotjar"
        dangerouslySetInnerHTML={{
          __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3585420,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('Script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
        }}
      />

      <body
        className="font-pretendard font-medium"
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
