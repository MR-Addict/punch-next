"use client";

import { useMemo } from "react";
import { BsFillCalendarDayFill, BsFillCalendarDateFill } from "react-icons/bs";
import { BsFillCalendarMonthFill, BsFillCalendarWeekFill } from "react-icons/bs";

import Chip from "./Chip";
import formatDate from "@/lib/utils/formatDate";
import getISOWeekNumber from "@/lib/utils/getISOWeekNumber";
import { NoteDatabseType } from "@/types/notes";
import { useViewContext } from "@/contexts/View/ViewProvider";

function getToday(notes: NoteDatabseType[]) {
  return notes.filter((note) => formatDate(note.date) === formatDate(new Date())).length;
}

function getThisWeek(notes: NoteDatabseType[]) {
  return notes.filter((note) => getISOWeekNumber(note.date) === getISOWeekNumber(new Date())).length;
}

function getThisMonth(notes: NoteDatabseType[]) {
  return notes.filter((note) => formatDate(note.date).slice(0, 7) === formatDate(new Date()).slice(0, 7)).length;
}

export default function Chips() {
  const { notes } = useViewContext();

  const all = notes.length;
  const today = useMemo(() => getToday(notes), [notes]);
  const thisWeek = useMemo(() => getThisWeek(notes), [notes]);
  const thisMonth = useMemo(() => getThisMonth(notes), [notes]);

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <Chip Icon={BsFillCalendarDateFill} title="今日提交" value={today} color="#FF6D28" />
      <Chip Icon={BsFillCalendarDayFill} title="本周提交" value={thisWeek} color="#FA2FB5" />
      <Chip Icon={BsFillCalendarMonthFill} title="本月提交" value={thisMonth} color="#8758FF" />
      <Chip Icon={BsFillCalendarWeekFill} title="所有提交" value={all} color="#42855B" />
    </section>
  );
}
