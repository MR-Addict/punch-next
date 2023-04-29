"use client";

import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { formatDate } from "@/lib/utils";
import { NoteDatabseType } from "@/types/notes";
import { useClientContext } from "../../contexts";

export type FilterType = "所有" | "航模组" | "编程组" | "电子组" | "静模组";

function filterNotes(notes: NoteDatabseType[], filter: FilterType) {
  if (filter === "所有") return notes;
  return notes.filter((note) => note.group === filter);
}

function searchNotes(notes: NoteDatabseType[], searchKeywords: string) {
  type KeyType = "group" | "name" | "content" | "date";
  const keys: KeyType[] = ["group", "name", "content", "date"];
  return notes.filter((note) =>
    keys.some((key) => {
      if (key === "date") return formatDate(note[key]).includes(searchKeywords);
      else return note[key]?.toLowerCase().includes(searchKeywords);
    })
  );
}

export default function Toolbar() {
  const [filter, setFilter] = useState<FilterType>("所有");
  const [searchKeywords, setSearchKeywords] = useState("");
  const { rawNotes, setNotes, setCurrentPage } = useClientContext();

  useEffect(() => {
    setCurrentPage(0);
    setNotes(searchNotes(filterNotes(rawNotes, filter), searchKeywords.toLowerCase()));
  }, [filter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(0);
      setNotes(searchNotes(filterNotes(rawNotes, filter), searchKeywords.toLowerCase()));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchKeywords]);

  useEffect(() => {
    setFilter("所有");
    setSearchKeywords("");
  }, [rawNotes]);

  return (
    <section className='w-full flex flex-row justify-end gap-3 mb-3'>
      <div className='bg-dark w-full flex flex-row items-center gap-1 justify-end border border-gray-500 py-1 px-2 rounded-sm focus-within:border-blue-600'>
        <input
          value={searchKeywords}
          placeholder='Search...'
          aria-label='search input'
          name='filter searchKeywords'
          onChange={(e) => setSearchKeywords(e.target.value.trim())}
          className='bg-dark w-full outline-none'
        />

        {searchKeywords.length !== 0 && (
          <button type='button' aria-label='clear button' onClick={() => setSearchKeywords("")}>
            <AiOutlineCloseCircle />
          </button>
        )}
      </div>

      <select
        value={filter}
        name='filter type'
        aria-label='group filter'
        // @ts-expect-error
        onChange={(e) => setFilter(e.target.value)}
        className='border bg-dark border-gray-500 py-1 px-2 outline-none rounded-sm focus:border-blue-600'
      >
        <option value='所有'>所有</option>
        <option value='航模组'>航模组</option>
        <option value='编程组'>编程组</option>
        <option value='电子组'>电子组</option>
        <option value='静模组'>静模组</option>
      </select>
    </section>
  );
}
