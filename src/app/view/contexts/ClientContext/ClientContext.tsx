"use client";

import { createContext, useContext, useState, useMemo } from "react";

import { NoteDatabseType } from "@/types/notes";

export type TabType = "table" | "chart";

type FilterType = "技术部" | "航模组" | "编程组" | "电子组" | "静模组";

interface ClientContextProps {
  notes: NoteDatabseType[];
  rawNotes: NoteDatabseType[];
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  activeTab: TabType;
  setActiveTab: (value: TabType) => void;
}

const ClientContext = createContext<ClientContextProps>({
  notes: [],
  rawNotes: [],
  filter: "技术部",
  setFilter: (value: FilterType) => {},
  activeTab: "table",
  setActiveTab: (value: TabType) => {}
});

function filterNotes(notes: NoteDatabseType[], filter: FilterType) {
  if (filter === "技术部") return notes;
  return notes.filter((note) => note.group === filter);
}

interface ClientContextProviderProps {
  children: React.ReactNode;
  data: NoteDatabseType[];
}

export const ClientContextProvider = ({ children, data }: ClientContextProviderProps) => {
  const [filter, setFilter] = useState<FilterType>("技术部");
  const [activeTab, setActiveTab] = useState<TabType>("table");

  const notes = useMemo(() => filterNotes(data, filter), [data, filter]);

  return (
    <ClientContext.Provider value={{ notes, rawNotes: data, filter, setFilter, activeTab, setActiveTab }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
