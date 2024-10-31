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

  const termIndex = useMemo(() => searchParams.get("termIndex") || "0", [searchParams]);

  function handleClick(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParam(router, { termIndex: event.target.value, page: "" });
  }

  if (terms === undefined) return <div className={clsx(style.wrapper, style.skeleton)} />;
  if (terms === null) return null;

  return (
    <select value={termIndex} className={clsx(style.wrapper, style.select)} onChange={handleClick}>
      {terms.map((item, index) => (
        <option key={item} value={index}>
          {item}
        </option>
      ))}
    </select>
  );
}
