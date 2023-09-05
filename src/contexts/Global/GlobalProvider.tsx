"use client";

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";

import { formatDate } from "@/lib/utils";

type Status = "idle" | "done" | "duplicated";

interface GlobalContextProps {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
}

const GlobalContext = createContext<GlobalContextProps>({
  status: "idle",
  setStatus: (value: SetStateAction<Status>) => {}
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const lastSubmit = document.cookie.match(/\blast_submit\b=([^;]*)/)?.at(1);
    if (lastSubmit && formatDate(new Date()) === formatDate(lastSubmit)) setStatus("duplicated");
  }, []);

  return <GlobalContext.Provider value={{ status, setStatus }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);
