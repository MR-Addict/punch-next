"use client";

import getTermsApi from "@/lib/api/terms/getTermsApi";
import { PublicEnv, PublicEnvType } from "@/types/env";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

interface AppContextProps {
  env: PublicEnvType | null;
  term: string | null;
  terms: string[] | null;
}

const AppContext = createContext<AppContextProps>({
  env: null,
  term: null,
  terms: null
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [env, setEnv] = useState<PublicEnvType | null>(null);
  const [terms, setTerms] = useState<string[] | null>(null);

  const searchParams = useSearchParams();
  const term = useMemo(() => searchParams.get("term") || terms?.at(0) || "", [terms, searchParams]);

  useEffect(() => {
    getTermsApi().then((res) => setTerms(res));
    fetch("/api/env")
      .then((res) => res.json())
      .then((res) => setEnv(PublicEnv.parse(res)));
  }, []);

  return <AppContext.Provider value={{ env, term, terms }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
