"use client";

import { createContext, useContext, useState, useMemo } from "react";

import { NoteDatabseType } from "@/types/notes";
import { TableContextProvider } from "@/contexts/Table/TableProvider";

export type TabType = "table" | "chart";

interface ViewContextProps {
  activeTab: TabType;
  archiveIndex: number;
  notes: NoteDatabseType[];
  archives: { index: number; name: string }[];
  setActiveTab: (value: TabType) => void;
  setArchiveIndex: (value: number) => void;
}

const ViewContext = createContext<ViewContextProps>({
  notes: [],
  archives: [],
  archiveIndex: 0,
  activeTab: "table",
  setArchiveIndex(value: number) {},
  setActiveTab: (value: TabType) => {}
});

interface ViewContextProviderProps {
  children: React.ReactNode;
  data: { name: string; notes: NoteDatabseType[] }[];
}

export const ViewContextProvider = ({ children, data }: ViewContextProviderProps) => {
  const [archiveIndex, setArchiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("table");

  const notes = useMemo(() => data.at(archiveIndex)?.notes || [], [archiveIndex]);
  const archives = useMemo(() => data.map((item, index) => ({ index, name: item.name })), [data]);

  return (
    <ViewContext.Provider
      value={{
        notes,
        archives,
        activeTab,
        archiveIndex,
        setActiveTab,
        setArchiveIndex
      }}
    >
      <TableContextProvider rawNotes={notes}>{children}</TableContextProvider>
    </ViewContext.Provider>
  );
};

export const useViewContext = () => useContext(ViewContext);
