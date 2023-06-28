import "./globals.css";

import { Suspense } from "react";
import { PopupContextProvider } from "@/contexts";
import { Footer, Navbar, Cronitor } from "@/components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>
        <PopupContextProvider>
          <Suspense>
            <Navbar />
            {children}
            <Footer />
            <Cronitor />
          </Suspense>
        </PopupContextProvider>
      </body>
    </html>
  );
}
