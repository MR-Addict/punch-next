import "./globals.css";

import TopNavbar from "@/components/Navbar/TopNavbar/TopNavbar";
import BottomNavbar from "@/components/Navbar/BottomNavbar/BottomNavbar";

import { AppContextProvider } from "@/contexts/App/AppProvider";
import { PopupContextProvider } from "@/contexts/Popup/PopupProvider";
import { TelegramWebAppContextProvider } from "@/contexts/TelegramWebApp/TelegramWebAppProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>
        <TelegramWebAppContextProvider>
          <AppContextProvider>
            <PopupContextProvider>
              <TopNavbar />
              {children}
              <BottomNavbar />
            </PopupContextProvider>
          </AppContextProvider>
        </TelegramWebAppContextProvider>
      </body>
    </html>
  );
}
