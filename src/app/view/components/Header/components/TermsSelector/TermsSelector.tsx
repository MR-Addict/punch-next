"use client";

import clsx from "clsx";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import style from "./TermsSelector.module.css";
import setSearchParam from "@/lib/utils/setSearchParam";
import { useViewContext } from "@/contexts/View/ViewProvider";

export default function TermsSelector() {
  const { terms } = useViewContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const term = useMemo(() => searchParams.get("term") || terms?.at(0) || "", [terms, searchParams]);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParam(router, { term: event.target.value, page: "" });
  }

  if (terms === undefined) return <div className={clsx(style.wrapper, style.skeleton)} />;
  if (terms === null) return null;

  return (
    <div className={style.wrapper}>
      <select value={term} className={style.select} onChange={handleChange} aria-label="term">
        {terms.map((term) => (
          <option key={term} value={term}>
            {term}
          </option>
        ))}
      </select>
    </div>
  );
}
