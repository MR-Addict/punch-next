"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";

import formatDate from "@/lib/utils/formatDate";
import { NoteDatabseType } from "@/types/notes";

const notesPerpage = 20;

interface TableContextProps {
  setSearchKeywords: (value: string) => void;
  totalPages: number;
  notesPerpage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  currentNotes: NoteDatabseType[];
  notes: NoteDatabseType[];
  rawNotes: NoteDatabseType[];
}

const TableContext = createContext<TableContextProps>({
  setSearchKeywords(value: string) {},
  notesPerpage,
  totalPages: 0,
  currentPage: 0,
  setCurrentPage(value: number) {},
  currentNotes: [],
  notes: [],
  rawNotes: []
});

function searchNotes(notes: NoteDatabseType[], searchKeywords: string) {
  type KeyType = "group" | "name" | "content" | "date" | "week";
  const keys: KeyType[] = ["group", "name", "content", "date", "week"];
  return notes.filter((note) =>
    keys.some((key) => {
      if (key === "date") return formatDate(note[key]).includes(searchKeywords);
      else return String(note[key]).toLowerCase().includes(searchKeywords);
    })
  );
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
        setSearchKeywords,
        totalPages,
        notesPerpage,
        currentPage,
        setCurrentPage,
        currentNotes,
        notes,
        rawNotes
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
