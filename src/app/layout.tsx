import "./globals.css";

import TopNavbar from "@/components/Navbar/TopNavbar/TopNavbar";
import BottomNavbar from "@/components/Navbar/BottomNavbar/BottomNavbar";
import { AppContextProvider } from "@/contexts/App/AppProvider";
import { PopupContextProvider } from "@/contexts/Popup/PopupProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>
        <AppContextProvider>
          <PopupContextProvider>
            <TopNavbar />
            {children}
            <BottomNavbar />
          </PopupContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
