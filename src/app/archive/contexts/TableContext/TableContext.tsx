"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";

import { formatDate } from "@/lib/utils";
import { NoteDatabseType } from "@/types/notes";

const notesPerpage = 20;

interface TableContextProps {
  setSearchKeywords: (value: string) => void;
  totalPages: number;
  notesPerpage: number;
  totalArchives: { index: number; name: string }[];
  archiveIndex: number;
  setArchiveIndex: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  currentNotes: NoteDatabseType[];
  notes: NoteDatabseType[];
}

const TableContext = createContext<TableContextProps>({
  setSearchKeywords(value: string) {},
  notesPerpage,
  totalPages: 0,
  totalArchives: [],
  archiveIndex: 0,
  setArchiveIndex(value: number) {},
  currentPage: 0,
  setCurrentPage(value: number) {},
  currentNotes: [],
  notes: [],
});

function searchNotes(notes: NoteDatabseType[], searchKeywords: string) {
  type KeyType = "group" | "name" | "content" | "date";
  const keys: KeyType[] = ["group", "name", "content", "date"];
  return notes.filter((note) =>
    keys.some((key) => {
      if (key === "date") return formatDate(note[key]).includes(searchKeywords);
      else return note[key]?.toLowerCase().includes(searchKeywords);
    })
  );
}

interface Props {
  children: React.ReactNode;
  data: { name: string; notes: NoteDatabseType[] }[];
}

export const TableContextProvider = ({ children, data }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [archiveIndex, setArchiveIndex] = useState(0);
  const [searchKeywords, setSearchKeywords] = useState("");

  const rawNotes = useMemo(() => data[archiveIndex].notes, [archiveIndex]);
  const notes = useMemo(() => searchNotes(rawNotes, searchKeywords), [rawNotes, searchKeywords]);
  const totalPages = useMemo(() => Math.ceil(notes.length / notesPerpage), [notes]);
  const totalArchives = useMemo(() => data.map((item, index) => ({ index, name: item.name })), [data]);

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
        totalArchives,
        archiveIndex,
        setArchiveIndex,
        currentPage,
        setCurrentPage,
        currentNotes,
        notes,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
