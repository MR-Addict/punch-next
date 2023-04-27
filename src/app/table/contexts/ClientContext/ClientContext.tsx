"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";

import { NoteDatabseType } from "@/types/notes";

const notesPerpage = 20;

interface ClientContextProps {
  totalPages: number;
  notesPerpage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  currentNotes: NoteDatabseType[];
  rawNotes: NoteDatabseType[];
  notes: NoteDatabseType[];
  setNotes: (value: NoteDatabseType[]) => void;
}

const ClientContext = createContext<ClientContextProps>({
  notesPerpage,
  totalPages: 0,
  currentPage: 0,
  setCurrentPage(value: number) {},
  currentNotes: [],
  rawNotes: [],
  notes: [],
  setNotes(value: NoteDatabseType[]) {},
});

interface ClientContextProviderProps {
  children: React.ReactNode;
  data: NoteDatabseType[];
}

export const ClientContextProvider = ({ children, data }: ClientContextProviderProps) => {
  const [notes, setNotes] = useState(data);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => setNotes(data), [data]);

  const totalPages = useMemo(() => Math.ceil(data.length / notesPerpage), [data]);

  const currentNotes = useMemo(() => {
    const firstNoteIndex = currentPage * notesPerpage;
    const lastNoteIndex = firstNoteIndex + notesPerpage;
    return notes.slice(firstNoteIndex, lastNoteIndex);
  }, [notes, notesPerpage, currentPage]);

  return (
    <ClientContext.Provider
      value={{ totalPages, notesPerpage, currentPage, setCurrentPage, rawNotes: data, currentNotes, notes, setNotes }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
