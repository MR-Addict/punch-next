"use client";

import clsx from "clsx";
import { useMemo } from "react";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";

import style from "./Table.module.css";
import groupBy from "@/lib/utils/groupBy";
import formatDate from "@/lib/utils/formatDate";
import timeInterval from "@/lib/utils/timeInterval";
import usePersistantState from "@/hooks/usePersistantState";

import { NoteDatabseType } from "@/types/notes";
import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";

export default function Table({ notes }: { notes: NoteDatabseType[] }) {
  const [intervalFomatDate, setIntervalFomatDate] = usePersistantState("view-interval-format-date", true);

  const notesGroupedByWeek = useMemo(() => groupBy(notes, (note) => `#第${note.week}周`), [notes]);

  function toggleIntervalFomatDate() {
    setIntervalFomatDate((prev) => !prev);
  }

  return (
    <ul className="w-full space-y-10 animate-slideFromBottom">
      {notesGroupedByWeek.map((group) => (
        <li key={group.category} className="space-y-1 md:space-y-3">
          <h1 className="font-semibold">{group.category}</h1>

          <ul className="space-y-5">
            {group.data.map((note) => (
              <li key={note._id} className={style.note}>
                <header className="flex flex-row w-fit text-gray-500">
                  <p className={style.chip}>
                    <AiOutlineUser />
                    <span>{note.name}</span>
                  </p>

                  <button type="button" className={clsx(style.chip, "ml-3 mr-2")} onClick={toggleIntervalFomatDate}>
                    <AiOutlineCalendar />
                    {intervalFomatDate && <span>{timeInterval(note.date)}</span>}
                    {!intervalFomatDate && <span>{formatDate(note.date, false)}</span>}
                  </button>

                  {note.useMarkdown && (
                    <span className="gradient-600 text-white text-xs rounded-sm h-fit px-1 -translate-y-0.5">Md</span>
                  )}
                </header>

                {note.useMarkdown && <MarkdownRenderer content={note.content} />}
                {!note.useMarkdown && <p className="whitespace-pre-wrap mt-3 text-gray-700">{note.content}</p>}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
