"use client";

import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";

import style from "./Table.module.css";
import groupBy from "@/lib/utils/groupBy";
import formatDate from "@/lib/utils/formatDate";
import { useTableContext } from "@/contexts/Table/TableProvider";
import RenderMarkdown from "@/components/RenderMarkdown/RenderMarkdown";

export default function Table() {
  const { currentNotes, setSearchKeywords } = useTableContext();

  if (currentNotes.length === 0) return <h1 className="w-full text-center py-28 rounded-sm">没有符合条件的结果</h1>;

  const notesGroupedByWeek = groupBy(currentNotes, (note) => `#第${note.week}周`);

  return (
    <ul className="space-y-10 animate-slideFromBottom">
      {notesGroupedByWeek.map((group) => (
        <li key={group.category} className="space-y-1 md:space-y-3">
          <h1 className="font-semibold">{group.category}</h1>

          <ul className="space-y-5">
            {group.data.map((note) => (
              <li key={note._id} className="flex flex-col md:flex-row gap-2">
                <button type="button" className={style.avatar} onClick={() => setSearchKeywords(note.name)}>
                  {note.name.at(0)}
                </button>

                <div className="flex flex-col w-full gradient-50 py-3 px-4 rounded-md shadow-md duration-300">
                  <h2 className="flex flex-row items-center gap-0.5 border-b border-b-gray-300 w-fit text-gray-500">
                    <AiOutlineUser />
                    <span className="mr-2">{note.name}</span>

                    <AiOutlineCalendar />
                    <span>{formatDate(note.date)}</span>
                  </h2>

                  <RenderMarkdown content={note.content} />
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
