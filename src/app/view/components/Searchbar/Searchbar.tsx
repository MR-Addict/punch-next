"use client";

import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import style from "./Searchbar.module.css";
import { useTableContext } from "@/contexts/Table/TableProvider";

export default function Searchbar() {
  const { setSearchKeywords } = useTableContext();

  const [localSearchKeywords, setLocalSearchKeywords] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSearchKeywords(localSearchKeywords.toLocaleLowerCase()), 500);
    return () => clearTimeout(timer);
  }, [localSearchKeywords]);

  return (
    <div className={style.wrapper}>
      <p className="text-lg">🔍</p>

      <input
        value={localSearchKeywords}
        placeholder="Search..."
        aria-label="search input"
        name="filter searchKeywords"
        className="bg-transparent w-full outline-none"
        onChange={(e) => setLocalSearchKeywords(e.target.value)}
      />

      {localSearchKeywords.length !== 0 && (
        <button
          type="button"
          aria-label="clear"
          className="hover:md:bg-black/20 bg-black/10 rounded-full p-1"
          onClick={() => setLocalSearchKeywords("")}
        >
          <AiOutlineClose size={13} />
        </button>
      )}
    </div>
  );
}
