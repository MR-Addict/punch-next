import "./globals.css";

import { PopupContextProvider } from "@/contexts";
import { Footer, Navbar, VercelAnalytics } from "@/components";

export const metadata = {
  title: "值班笔记",
  description: "值班笔记",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-Hans'>
      <body>
        <VercelAnalytics />
        <PopupContextProvider>
          <Navbar />
          {children}
          <Footer />
        </PopupContextProvider>
      </body>
    </html>
  );
}
