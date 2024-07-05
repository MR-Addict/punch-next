"use client";

import Script from "next/script";
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
  const [webApp, setWebApp] = useState<WebApp | null>(null);

  useEffect(() => {
    const app = window.Telegram.WebApp;
    if (!app) return;

    // Initialize the Telegram Web App
    app.ready();
    // Expand the Telegram Web App
    app.expand();
    // Set the background color
    app.setBackgroundColor("#faf5ff");

    setWebApp(app);
  }, []);

  return (
    <TelegramWebAppContext.Provider value={{ webApp }}>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      {children}
    </TelegramWebAppContext.Provider>
  );
};

export const useTelegramWebAppContext = () => useContext(TelegramWebAppContext);
