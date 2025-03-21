import "./globals.css";

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import { AppContextProvider } from "@/contexts/App/AppProvider";

import TopNavbar from "@/components/Navbar/TopNavbar/TopNavbar";
import BottomNavbar from "@/components/Navbar/BottomNavbar/BottomNavbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>
        <Suspense>
          <AppContextProvider>
            <Toaster />
            <TopNavbar />
            {children}
            <BottomNavbar />
          </AppContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
