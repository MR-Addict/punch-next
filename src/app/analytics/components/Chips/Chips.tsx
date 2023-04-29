import { BsFillCalendarDayFill, BsFillCalendarDateFill } from "react-icons/bs";
import { BsFillCalendarMonthFill, BsFillCalendarWeekFill } from "react-icons/bs";

import Chip from "./Chip";
import { formatDate } from "@/lib/utils";
import { NoteDatabseType } from "@/types/notes";

function getToday(notes: NoteDatabseType[]) {
  return notes.filter((note) => formatDate(note.date) === formatDate(new Date())).length;
}

function getThisWeek(notes: NoteDatabseType[]) {
  const now = new Date();
  const firstDay = now.getDate() - now.getDay();
  const lastDay = firstDay + 6;

  const thisWeekFirstDay = new Date(now.setDate(firstDay));
  const thisWeekLastDay = new Date(now.setDate(lastDay));

  return notes.filter((note) => note.date <= thisWeekLastDay && note.date >= thisWeekFirstDay).length;
}

function getThisMonth(notes: NoteDatabseType[]) {
  return notes.filter((note) => formatDate(note.date).slice(0, 7) === formatDate(new Date()).slice(0, 7)).length;
}

export default function Chips({ notes }: { notes: NoteDatabseType[] }) {
  const all = notes.length;
  const today = getToday(notes);
  const thisWeek = getThisWeek(notes);
  const thisMonth = getThisMonth(notes);

  return (
    <section className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-7'>
      <Chip Icon={BsFillCalendarDateFill} title='今日提交' value={today} color='#FF6D28' />
      <Chip Icon={BsFillCalendarDayFill} title='本周提交' value={thisWeek} color='#FA2FB5' />
      <Chip Icon={BsFillCalendarMonthFill} title='本月提交' value={thisMonth} color='#8758FF' />
      <Chip Icon={BsFillCalendarWeekFill} title='所有提交' value={all} color='#42855B' />
    </section>
  );
}
