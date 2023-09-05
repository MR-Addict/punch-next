"use client";

import { createContext, useContext, useState, useMemo } from "react";

import { NoteDatabseType } from "@/types/notes";
import { TableContextProvider } from "@/contexts/Table/TableProvider";

interface ClientContextProps {
  archiveIndex: number;
  totalArchives: { index: number; name: string }[];
  setArchiveIndex: (value: number) => void;
}

const ClientContext = createContext<ClientContextProps>({
  archiveIndex: 0,
  totalArchives: [],
  setArchiveIndex(value: number) {}
});

interface Props {
  children: React.ReactNode;
  data: { name: string; notes: NoteDatabseType[] }[];
}

export const ClientContextProvider = ({ children, data }: Props) => {
  const [archiveIndex, setArchiveIndex] = useState(0);

  const rawNotes = useMemo(() => data[archiveIndex].notes, [archiveIndex]);
  const totalArchives = useMemo(() => data.map((item, index) => ({ index, name: item.name })), [data]);

  return (
    <ClientContext.Provider value={{ archiveIndex, totalArchives, setArchiveIndex }}>
      <TableContextProvider rawNotes={rawNotes}>{children}</TableContextProvider>
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
