"use client";

import style from "./Filter.module.css";
import { useClientContext } from "../../../../contexts/ClientContext";

export default function Filter() {
  const { filter, setFilter } = useClientContext();
  const { totalArchives, archiveIndex, setArchiveIndex } = useClientContext();

  return (
    <div className="space-x-2">
      <select
        value={filter}
        // @ts-expect-error
        onChange={(e) => setFilter(e.target.value)}
        className={style.select}
      >
        <option value="技术部">所有</option>
        <option value="航模组">航模组</option>
        <option value="编程组">编程组</option>
        <option value="电子组">电子组</option>
        <option value="静模组">静模组</option>
      </select>

      <select value={archiveIndex} onChange={(e) => setArchiveIndex(Number(e.target.value))} className={style.select}>
        {totalArchives.map((item) => (
          <option key={item.name} value={item.index}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
