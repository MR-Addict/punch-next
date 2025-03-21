"use client";

import clsx from "clsx";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import style from "./TermsSelector.module.css";
import setSearchParam from "@/lib/utils/setSearchParam";
import { useAppContext } from "@/contexts/App/AppProvider";

export default function TermsSelector() {
  const { term, terms } = useAppContext();

  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParam(router, { term: event.target.value, page: "" });
  }

  if (terms === undefined) return <div className={clsx(style.wrapper, style.skeleton)} />;
  if (terms === null) return null;

  return (
    <select value={term || ""} className={clsx(style.wrapper, style.select)} onChange={handleChange} aria-label="term">
      {terms.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
