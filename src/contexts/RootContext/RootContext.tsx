"use client";

import { createContext, useContext, useState } from "react";

interface RootContextProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const RootContext = createContext<RootContextProps>({
  isDarkMode: false,
  setIsDarkMode: (value: boolean) => {},
});

export const RootContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return <RootContext.Provider value={{ isDarkMode, setIsDarkMode }}>{children}</RootContext.Provider>;
};

export const useRootContext = () => useContext(RootContext);
