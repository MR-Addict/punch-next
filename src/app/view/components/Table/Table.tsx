"use client";

import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";

import style from "./Table.module.css";
import groupBy from "@/lib/utils/groupBy";
import formatDate from "@/lib/utils/formatDate";
import timeInterval from "@/lib/utils/timeInterval";
import usePersistantState from "@/hooks/usePersistantState";
import { useTableContext } from "@/contexts/Table/TableProvider";

import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";

export default function Table() {
  const { currentNotes } = useTableContext();
  const [intervalFomatDate, setIntervalFomatDate] = usePersistantState("view-interval-format-date", true);

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
                <p className={style.avatar}>{note.name.at(0)}</p>

                <div className="flex flex-col w-full gradient-50 pt-4 px-5 rounded-md shadow-md duration-300">
                  <h2 className="flex flex-row gap-2 w-fit text-gray-500">
                    <p className="flex flex-row items-center gap-0.5 border-b border-b-gray-300">
                      <AiOutlineUser />
                      <span className="mr-2">{note.name}</span>
                    </p>

                    <button
                      type="button"
                      className="flex flex-row items-center gap-0.5 border-b border-b-gray-300"
                      onClick={() => setIntervalFomatDate((prev) => !prev)}
                    >
                      <AiOutlineCalendar />
                      {intervalFomatDate && <span>{timeInterval(note.date)}</span>}
                      {!intervalFomatDate && <span>{formatDate(note.date, false)}</span>}
                    </button>
                  </h2>

                  <MarkdownRenderer content={note.content} />
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
