"use client";

import { AiOutlineClose } from "react-icons/ai";

import style from "./Searchbar.module.css";
import { useTableContext } from "@/contexts/Table/TableProvider";

export default function Searchbar() {
  const { searchKeywords, setSearchKeywords } = useTableContext();

  return (
    <div className={style.wrapper}>
      <p className="text-lg">🔍</p>

      <input
        value={searchKeywords}
        placeholder="Search..."
        aria-label="search input"
        name="filter searchKeywords"
        className="bg-transparent w-full outline-none"
        onChange={(e) => setSearchKeywords(e.target.value)}
      />

      {searchKeywords.length !== 0 && (
        <button
          type="button"
          aria-label="clear button"
          className="hover:md:bg-black/20 bg-black/10 rounded-full p-1"
          onClick={() => setSearchKeywords("")}
        >
          <AiOutlineClose size={13} />
        </button>
      )}
    </div>
  );
}
