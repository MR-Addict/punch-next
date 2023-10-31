"use client";

import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { useTableContext } from "@/contexts/Table/TableProvider";

export default function Searchbar() {
  const { setSearchKeywords } = useTableContext();
  const [localSearchKeywords, setLocalSearchKeywords] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSearchKeywords(localSearchKeywords.toLowerCase().trim()), 500);
    return () => clearTimeout(timer);
  }, [localSearchKeywords]);

  return (
    <div className="bg-dark w-full flex flex-row items-center gap-1 justify-end rounded-md py-1.5 px-3 animate-slideFromTop">
      <input
        value={localSearchKeywords}
        placeholder="Search..."
        aria-label="search input"
        name="filter searchKeywords"
        className="bg-dark w-full outline-none"
        onChange={(e) => setLocalSearchKeywords(e.target.value)}
      />

      {localSearchKeywords.length !== 0 && (
        <button type="button" aria-label="clear button" onClick={() => setLocalSearchKeywords("")}>
          <AiOutlineCloseCircle />
        </button>
      )}
    </div>
  );
}
