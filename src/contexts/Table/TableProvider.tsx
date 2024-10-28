"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";

import { NoteDatabseType } from "@/types/notes";

const notesPerpage = 30;

interface TableContextProps {
  totalPages: number;
  currentPage: number;
  notesPerpage: number;
  notes: NoteDatabseType[];
  currentNotes: NoteDatabseType[];
  setCurrentPage: (value: number) => void;
  setSearchKeywords: (value: string) => void;
}

const TableContext = createContext<TableContextProps>({
  notes: [],
  notesPerpage,
  totalPages: 0,
  currentPage: 0,
  currentNotes: [],
  setCurrentPage(value: number) {},
  setSearchKeywords(value: string) {}
});

function searchNotes(notes: NoteDatabseType[], searchKeywords: string) {
  type KeyType = "name" | "content";
  const keys: KeyType[] = ["name", "content"];
  return notes.filter((note) => keys.some((key) => note[key].toLowerCase().includes(searchKeywords)));
}

interface Props {
  children: React.ReactNode;
  rawNotes: NoteDatabseType[];
}

export const TableContextProvider = ({ children, rawNotes }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchKeywords, setSearchKeywords] = useState("");

  const notes = useMemo(() => searchNotes(rawNotes, searchKeywords), [rawNotes, searchKeywords]);
  const totalPages = useMemo(() => Math.ceil(notes.length / notesPerpage), [notes]);

  const currentNotes = useMemo(() => {
    const firstNoteIndex = currentPage * notesPerpage;
    const lastNoteIndex = firstNoteIndex + notesPerpage;
    return notes.slice(firstNoteIndex, lastNoteIndex);
  }, [notes, currentPage]);

  useEffect(() => setCurrentPage(0), [totalPages]);

  return (
    <TableContext.Provider
      value={{
        notes,
        totalPages,
        notesPerpage,
        currentPage,
        currentNotes,
        setCurrentPage,
        setSearchKeywords
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
