"use client";

import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import style from "./Searchbar.module.css";
import setSearchParam from "@/lib/utils/setSearchParam";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  function handleSetSearchQuery(query: string) {
    setSearchQuery(query);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearchParam(router, { query, page: "" }), 500);
  }

  useEffect(() => setSearchQuery(searchParams.get("query") || ""), [searchParams]);

  return (
    <div className={style.wrapper}>
      <p className="text-lg">🔍</p>

      <input
        value={searchQuery}
        placeholder="Search..."
        aria-label="search input"
        name="filter searchKeywords"
        className="bg-transparent w-full outline-none text-gray-800"
        onChange={(e) => handleSetSearchQuery(e.target.value)}
      />

      {searchQuery.length !== 0 && (
        <button
          type="button"
          aria-label="clear"
          className="hover:lg:bg-black/10 bg-black/5 rounded-full p-1"
          onClick={() => handleSetSearchQuery("")}
        >
          <AiOutlineClose size={12} />
        </button>
      )}
    </div>
  );
}
