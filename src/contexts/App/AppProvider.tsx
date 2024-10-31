"use client";

import { PublicEnv, PublicEnvType } from "@/types/env";
import { createContext, useContext, useState, useEffect } from "react";

interface AppContextProps {
  env: PublicEnvType | null;
}

const AppContext = createContext<AppContextProps>({
  env: null
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [env, setEnv] = useState<PublicEnvType | null>(null);

  useEffect(() => {
    fetch("/api/env")
      .then((res) => res.json())
      .then((res) => setEnv(PublicEnv.parse(res)));
  }, []);

  return <AppContext.Provider value={{ env }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
