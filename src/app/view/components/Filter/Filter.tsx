"use client";

import style from "./Filter.module.css";
import { useViewContext } from "@/contexts/View/ViewProvider";

export default function Filter() {
  const { archives, archiveIndex, setArchiveIndex } = useViewContext();

  return (
    <select
      value={archiveIndex}
      className={style.select}
      aria-label="archive selector"
      onChange={(e) => setArchiveIndex(Number(e.target.value))}
    >
      {archives.map((item) => (
        <option key={item.name} value={item.index}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
