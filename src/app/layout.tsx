import "./globals.css";

import { Footer, Navbar } from "@/components";
import { RootContextProvider } from "@/contexts";

export const metadata = {
  title: "值班笔记",
  description: "值班笔记",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-Hans'>
      <body>
        <RootContextProvider>
          <Navbar />
          {children}
          <Footer />
        </RootContextProvider>
      </body>
    </html>
  );
}
