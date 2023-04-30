"use client";

import { createContext, useContext, useState, useMemo } from "react";

import { NoteDatabseType } from "@/types/notes";

export type TabType = "chart" | "table";

type FilterType = "技术部" | "航模组" | "编程组" | "电子组" | "静模组";

interface ViewContextProps {
  firstWeek: Date;
  notes: NoteDatabseType[];
  rawNotes: NoteDatabseType[];
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  activeTab: TabType;
  setActiveTab: (value: TabType) => void;
}

const ViewContext = createContext<ViewContextProps>({
  firstWeek: new Date(),
  notes: [],
  rawNotes: [],
  filter: "技术部",
  setFilter: (value: FilterType) => {},
  activeTab: "table",
  setActiveTab: (value: TabType) => {},
});

function filterNotes(notes: NoteDatabseType[], filter: FilterType) {
  if (filter === "技术部") return notes;
  return notes.filter((note) => note.group === filter);
}

interface ViewContextProviderProps {
  children: React.ReactNode;
  data: NoteDatabseType[];
  firstWeek: Date;
}

export const ViewContextProvider = ({ children, data, firstWeek }: ViewContextProviderProps) => {
  const [filter, setFilter] = useState<FilterType>("技术部");
  const [activeTab, setActiveTab] = useState<TabType>("chart");

  const notes = useMemo(() => filterNotes(data, filter), [data, filter]);

  return (
    <ViewContext.Provider value={{ firstWeek, notes, rawNotes: data, filter, setFilter, activeTab, setActiveTab }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => useContext(ViewContext);
