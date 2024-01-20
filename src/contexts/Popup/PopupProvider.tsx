"use client";

import { createContext, useContext, useState, useEffect } from "react";

import Popup from "./Popup";

interface PopupContextProps {
  popup: (data: { success: boolean; message: string }) => void;
}

const PopupContext = createContext<PopupContextProps>({
  popup: (data: { success: boolean; message: string }) => {}
});

export const PopupContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState(false);
  const [data, setData] = useState({ success: false, message: "" });

  function popup(data: { success: boolean; message: string }) {
    setData(data);
    setActive(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => setActive(false), 3000);

    return () => clearTimeout(timer);
  }, [data]);

  return (
    <PopupContext.Provider value={{ popup }}>
      <Popup data={data} active={active} />
      {children}
    </PopupContext.Provider>
  );
};

export const usePopupContext = () => useContext(PopupContext);
