"use client";

import { createContext, useContext, useMemo } from "react";

import { NoteDatabseType } from "@/types/notes";
import { TableContextProvider } from "@/contexts/Table/TableProvider";
import usePersistantState from "@/hooks/usePersistantState";

export type TabType = "table" | "chart";

interface ViewContextProps {
  activeTab: TabType;
  setActiveTab: (value: TabType) => void;

  archiveIndex: number;
  setArchiveIndex: (value: number) => void;

  lastSynchronized: Date;
  notes: NoteDatabseType[];
  archives: { index: number; name: string }[];
}

const ViewContext = createContext<ViewContextProps>({
  archiveIndex: 0,
  setArchiveIndex(value: number) {},

  activeTab: "chart",
  setActiveTab: (value: TabType) => {},

  notes: [],
  archives: [],
  lastSynchronized: new Date()
});

interface ViewContextProviderProps {
  lastSynchronized: Date;
  children: React.ReactNode;
  data: { name: string; notes: NoteDatabseType[] }[];
}

export const ViewContextProvider = ({ children, lastSynchronized, data }: ViewContextProviderProps) => {
  const [archiveIndex, setArchiveIndex] = usePersistantState("view-archive-index", 0);
  const [activeTab, setActiveTab] = usePersistantState<TabType>("view-active-tab", "table");

  const notes = useMemo(() => data.at(archiveIndex)?.notes || [], [archiveIndex]);
  const archives = useMemo(() => data.map((item, index) => ({ index, name: item.name })), [data]);

  return (
    <ViewContext.Provider
      value={{
        activeTab,
        setActiveTab,

        archiveIndex,
        setArchiveIndex,

        notes,
        archives,
        lastSynchronized
      }}
    >
      <TableContextProvider rawNotes={notes}>{children}</TableContextProvider>
    </ViewContext.Provider>
  );
};

export const useViewContext = () => useContext(ViewContext);
