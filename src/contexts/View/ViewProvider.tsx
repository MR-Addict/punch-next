"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

import { PaginationType } from "@/types/app";
import { NoteDatabseType } from "@/types/notes";

import getTermsApi from "@/lib/api/terms/getTermsApi";
import getNotesApi from "@/lib/api/notes/getNotesApi";

const defaultPagination: PaginationType = { page: 1, pageSize: 20, total: 0 };

interface ViewContextProps {
  terms: string[] | null | undefined;

  pagination: PaginationType;

  notes: NoteDatabseType[] | null | undefined;

  refreshNotes: () => Promise<void>;
}

const ViewContext = createContext<ViewContextProps>({
  terms: undefined,

  pagination: defaultPagination,

  notes: undefined,

  refreshNotes: async () => {}
});

export const ViewContextProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();

  const [pagination, setPagination] = useState<PaginationType>(defaultPagination);
  const [terms, setTerms] = useState<string[] | null | undefined>(undefined);
  const [notes, setNotes] = useState<NoteDatabseType[] | null | undefined>(undefined);

  async function refreshNotes() {
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "20";
    const termIndex = searchParams.get("termIndex") || "0";
    const query = searchParams.get("query") || "";

    const res = await getNotesApi(Number(page), Number(pageSize), Number(termIndex), query);

    if (!res.success) {
      setNotes(null);
      setPagination(defaultPagination);
    } else {
      setNotes(res.data.data);
      setPagination(res.data.pagination);
    }
  }

  useEffect(() => {
    getTermsApi().then((res) => setTerms(res));
  }, []);

  return (
    <ViewContext.Provider
      value={{
        terms,

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
