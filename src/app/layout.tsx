import "./globals.css";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { PopupContextProvider } from "@/contexts/Popup/PopupProvider";

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
