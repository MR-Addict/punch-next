import "./globals.css";

import Script from "next/script";
import { Footer, Navbar } from "@/components";
import { PopupContextProvider } from "@/contexts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>
        <PopupContextProvider>
          <Navbar />
          {children}
          <Footer />
        </PopupContextProvider>
      </body>
      <Script async src="https://umami.mraddict.one/script.js" data-website-id="0a767ab9-b602-47dd-bab4-485ca6e9179b" />
    </html>
  );
}
