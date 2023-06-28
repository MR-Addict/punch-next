import "./globals.css";

import { PopupContextProvider } from "@/contexts";
import { Footer, Navbar, Cronitor } from "@/components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>
        <PopupContextProvider>
          <Navbar />
          {children}
          <Footer />
          <Cronitor />
        </PopupContextProvider>
      </body>
    </html>
  );
}
