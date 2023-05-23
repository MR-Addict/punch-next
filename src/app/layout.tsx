import "./globals.css";

import { Footer, Navbar } from "@/components";
import { PopupContextProvider } from "@/contexts";

export const metadata = {
  title: "值班笔记",
  description: "值班笔记",
  icons: { icon: "/favicon.ico" },
};

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
    </html>
  );
}
