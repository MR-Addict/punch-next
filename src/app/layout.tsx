import "./globals.css";

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
    </html>
  );
}
