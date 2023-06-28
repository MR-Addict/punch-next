"use client";

import { Suspense } from "react";
import { createContext, useContext, useState, useEffect } from "react";

import Popup from "./Popup";

interface PopupContextProps {
  popup: (data: { success: boolean; message: string }) => void;
}

const PopupContext = createContext<PopupContextProps>({
  popup: (data: { success: boolean; message: string }) => {}
});

export const PopupContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPopup, setIsPopup] = useState(false);
  const [popupData, setPopupData] = useState({ success: false, message: "" });

  function popup(data: { success: boolean; message: string }) {
    setPopupData(data);
    setIsPopup(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsPopup(false), 3000);

    return () => clearTimeout(timer);
  }, [popupData]);

  return (
    <PopupContext.Provider value={{ popup }}>
      <Suspense>
        <Popup popupData={popupData} isPopup={isPopup} />
        {children}
      </Suspense>
    </PopupContext.Provider>
  );
};

export const usePopupContext = () => useContext(PopupContext);
