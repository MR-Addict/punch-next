import clsx from "clsx";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";

import style from "./Note.module.css";
import formatDate from "@/lib/utils/formatDate";
import timeInterval from "@/lib/utils/timeInterval";

import { NoteDatabseType } from "@/types/notes";
import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";

interface NoteProps {
  note: NoteDatabseType;
  intervalFomatDate: boolean;
  setIntervalFomatDate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Note({ note, intervalFomatDate, setIntervalFomatDate }: NoteProps) {
  const toggleIntervalFomatDate = () => setIntervalFomatDate((prev) => !prev);

  return (
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
  );
}
