"use client";

import Script from "next/script";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

interface TelegramWebAppContextProps {
  webApp: WebApp | null;
}

const TelegramWebAppContext = createContext<TelegramWebAppContextProps>({
  webApp: null
});

interface TelegramWebAppContextProviderProps {
  children: React.ReactNode;
}

export const TelegramWebAppContextProvider = ({ children }: TelegramWebAppContextProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [webApp, setWebApp] = useState<WebApp | null>(null);

  useEffect(() => {
    const app = window.Telegram.WebApp;
    if (!app) return;

    // Initialize the Telegram Web App
    app.ready();
    // Expand the Telegram Web App
    app.expand();
    // Set the action of the back button
    app.BackButton.onClick(router.back);
    // Set the header color
    app.setHeaderColor("#eff6ff");
    // Set the background color
    app.setBackgroundColor("#faf5ff");

    setWebApp(app);
  }, []);

  useEffect(() => {
    if (!webApp) return;

    if (pathname === "/") webApp.BackButton.hide();
    else webApp.BackButton.show();
  }, [pathname, webApp]);

  return (
    <TelegramWebAppContext.Provider value={{ webApp }}>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      {children}
    </TelegramWebAppContext.Provider>
  );
};

export const useTelegramWebAppContext = () => useContext(TelegramWebAppContext);
