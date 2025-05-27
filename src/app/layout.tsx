import "./globals.css";

import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import { AppContextProvider } from "@/contexts/App/AppProvider";
import { ViewContextProvider } from "@/contexts/View/ViewProvider";

import TopNavbar from "@/components/Navbar/TopNavbar/TopNavbar";
import BottomNavbar from "@/components/Navbar/BottomNavbar/BottomNavbar";

import setMetadata from "@/lib/utils/setMetadata";

export const metadata = setMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>
        <Suspense>
          <AppContextProvider>
            <ViewContextProvider>
              <Toaster />
              <TopNavbar />
              {children}
              <BottomNavbar />
            </ViewContextProvider>
          </AppContextProvider>
        </Suspense>
      </body>
    </html>
  );
}
