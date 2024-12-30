"use client";

import { useMemo } from "react";

import groupBy from "@/lib/utils/groupBy";
import usePersistantState from "@/hooks/usePersistantState";
import { NoteDatabseType } from "@/types/notes";

import Note from "./Note/Note";

export default function Table({ notes }: { notes: NoteDatabseType[] }) {
  const [intervalFomatDate, setIntervalFomatDate] = usePersistantState("view-interval-format-date", true);

  const notesGroupedByWeek = useMemo(() => groupBy(notes, (note) => `#第${note.week}周`), [notes]);

  return (
    <ul className="w-full space-y-10 animate-slideFromBottom">
      {notesGroupedByWeek.map((group) => (
        <li key={group.category} className="space-y-1 lg:space-y-3">
          <h1 className="font-semibold">{group.category}</h1>

          <ul className="space-y-5">
            {group.data.map((note) => (
              <Note
                intervalFomatDate={intervalFomatDate}
                setIntervalFomatDate={setIntervalFomatDate}
                note={note}
                key={note._id}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
