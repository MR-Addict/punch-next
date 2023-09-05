"use client";

import { createContext, useContext, useState, useMemo } from "react";

import { NoteDatabseType } from "@/types/notes";
import { TableContextProvider } from "./TableProvider";

export type TabType = "table" | "chart";

type FilterType = "技术部" | "航模组" | "编程组" | "电子组" | "静模组";

interface ClientContextProps {
  filter: FilterType;
  activeTab: TabType;
  archiveIndex: number;
  notes: NoteDatabseType[];
  totalArchives: { index: number; name: string }[];
  setFilter: (value: FilterType) => void;
  setActiveTab: (value: TabType) => void;
  setArchiveIndex: (value: number) => void;
}

const ClientContext = createContext<ClientContextProps>({
  notes: [],
  totalArchives: [],
  archiveIndex: 0,
  filter: "技术部",
  activeTab: "table",
  setArchiveIndex(value: number) {},
  setFilter: (value: FilterType) => {},
  setActiveTab: (value: TabType) => {}
});

function filterNotes(notes: NoteDatabseType[], filter: FilterType) {
  if (filter === "技术部") return notes;
  return notes.filter((note) => note.group === filter);
}

interface ClientContextProviderProps {
  children: React.ReactNode;
  data: { name: string; notes: NoteDatabseType[] }[];
}

export const ClientContextProvider = ({ children, data }: ClientContextProviderProps) => {
  const [archiveIndex, setArchiveIndex] = useState(0);
  const [filter, setFilter] = useState<FilterType>("技术部");
  const [activeTab, setActiveTab] = useState<TabType>("table");

  const rawNotes = useMemo(() => data[archiveIndex].notes, [archiveIndex]);
  const notes = useMemo(() => filterNotes(rawNotes, filter), [rawNotes, filter]);
  const totalArchives = useMemo(() => data.map((item, index) => ({ index, name: item.name })), [data]);

  return (
    <ClientContext.Provider
      value={{
        notes,
        filter,
        activeTab,
        archiveIndex,
        totalArchives,
        setFilter,
        setActiveTab,
        setArchiveIndex
      }}
    >
      <TableContextProvider rawNotes={notes}>{children}</TableContextProvider>
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
