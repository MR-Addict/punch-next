"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

import { PaginationType } from "@/types/app";
import { NoteDatabseType } from "@/types/notes";

import getNotesApi from "@/lib/api/notes/getNotesApi";

const defaultPagination: PaginationType = { page: 1, pageSize: 20, total: 0 };

interface ViewContextProps {
  pagination: PaginationType;

  notes: NoteDatabseType[] | null | undefined;

  refreshNotes: () => Promise<void>;
}

const ViewContext = createContext<ViewContextProps>({
  pagination: defaultPagination,

  notes: undefined,

  refreshNotes: async () => {}
});

export const ViewContextProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();

  const [pagination, setPagination] = useState<PaginationType>(defaultPagination);
  const [notes, setNotes] = useState<NoteDatabseType[] | null | undefined>(undefined);

  async function refreshNotes() {
    const term = searchParams.get("term") || "";
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "20";
    const query = searchParams.get("query") || "";

    const res = await getNotesApi(term, Number(page), Number(pageSize), query);

    if (!res.success) {
      setNotes(null);
      setPagination(defaultPagination);
    } else {
      setNotes(res.data.data);
      setPagination(res.data.pagination);
    }
  }

  return (
    <ViewContext.Provider
      value={{
        pagination,

        notes,

        refreshNotes
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => useContext(ViewContext);
