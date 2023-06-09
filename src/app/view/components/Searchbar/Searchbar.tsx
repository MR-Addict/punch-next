"use client";

import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { useClientContext, useTableContext } from "../../contexts";

export default function Searchbar() {
  const { rawNotes } = useClientContext();
  const { setSearchKeywords } = useTableContext();
  const [localSearchKeywords, setLocalSearchKeywords] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSearchKeywords(localSearchKeywords.toLowerCase()), 500);
    return () => clearTimeout(timer);
  }, [localSearchKeywords]);

  if (rawNotes.length === 0) return <></>;

  return (
    <div className="bg-dark w-full flex flex-row items-center gap-1 justify-end border border-gray-500 py-1 px-2 rounded-sm focus-within:border-blue-600 animate-slideFromTop">
      <input
        value={localSearchKeywords}
        placeholder="Search..."
        aria-label="search input"
        name="filter searchKeywords"
        onChange={(e) => setLocalSearchKeywords(e.target.value.trim())}
        className="bg-dark w-full outline-none"
      />

      {localSearchKeywords.length !== 0 && (
        <button type="button" aria-label="clear button" onClick={() => setLocalSearchKeywords("")}>
          <AiOutlineCloseCircle />
        </button>
      )}
    </div>
  );
}
