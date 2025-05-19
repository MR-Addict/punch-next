import clsx from "clsx";
import { Tooltip } from "antd";
import { useState } from "react";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { MdOutlineContentCopy, MdOutlineCheck } from "react-icons/md";

import style from "./Note.module.css";
import formatDate from "@/lib/utils/formatDate";
import timeInterval from "@/lib/utils/timeInterval";
import copyToClipboard from "@/lib/utils/copyToClipboard";

import { NoteDatabseType } from "@/types/notes";
import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";

interface NoteProps {
  note: NoteDatabseType;
  intervalFomatDate: boolean;
  setIntervalFomatDate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Note({ note, intervalFomatDate, setIntervalFomatDate }: NoteProps) {
  const [copied, setCopied] = useState(false);

  const toggleIntervalFomatDate = () => setIntervalFomatDate((prev) => !prev);

  function handleCopy() {
    const success = copyToClipboard(note.content);
    if (!success) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <li key={note._id} className={style.note}>
      <header className={style.header}>
        <p className={style.chip}>
          <AiOutlineUser />
          <span>{note.name}</span>
        </p>

        <Tooltip title="切换日期格式">
          <button type="button" className={clsx(style.chip, "ml-4 mr-2")} onClick={toggleIntervalFomatDate}>
            <AiOutlineCalendar />
            {intervalFomatDate && <span>{timeInterval(note.date)}</span>}
            {!intervalFomatDate && <span>{formatDate(note.date, false)}</span>}
          </button>
        </Tooltip>

        {note.useMarkdown && (
          <span className="gradient-600 text-white text-xs rounded-sm h-fit px-1 -translate-y-0.5">Md</span>
        )}

        <Tooltip title="复制">
          <button type="button" className={style["copy-btn"]} onClick={handleCopy} aria-label="复制笔记内容">
            <MdOutlineContentCopy className={clsx({ [style.active]: !copied })} />
            <MdOutlineCheck className={clsx(style.check, { [style.active]: copied })} />
          </button>
        </Tooltip>
      </header>

      {note.useMarkdown && <MarkdownRenderer content={note.content} />}
      {!note.useMarkdown && <p className="whitespace-pre-wrap mt-3 text-gray-800">{note.content}</p>}
    </li>
  );
}
