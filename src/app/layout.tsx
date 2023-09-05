import "./globals.css";

import { Footer, Navbar } from "@/components";
import { GlobalContextProvider, PopupContextProvider } from "@/contexts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>
        <PopupContextProvider>
          <GlobalContextProvider>
            <Navbar />
            {children}
            <Footer />
          </GlobalContextProvider>
        </PopupContextProvider>
      </body>
    </html>
  );
}
