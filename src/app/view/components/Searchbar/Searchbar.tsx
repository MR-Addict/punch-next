"use client";

import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import style from "./Searchbar.module.css";
import { useTableContext } from "@/contexts/Table/TableProvider";

export default function Searchbar() {
  const { setSearchKeywords } = useTableContext();
  const [localSearchKeywords, setLocalSearchKeywords] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSearchKeywords(localSearchKeywords.toLowerCase().trim()), 500);
    return () => clearTimeout(timer);
  }, [localSearchKeywords]);

  return (
    <div className={style.wrapper}>
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
          aria-label="clear button"
          className="hover:md:text-black text-gray-600"
          onClick={() => setLocalSearchKeywords("")}
        >
          <AiOutlineCloseCircle />
        </button>
      )}
    </div>
  );
}
