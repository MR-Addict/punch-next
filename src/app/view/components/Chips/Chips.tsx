"use client";

import { useMemo } from "react";
import { BsFillCalendarDayFill, BsFillCalendarDateFill } from "react-icons/bs";
import { BsFillCalendarMonthFill, BsFillCalendarWeekFill } from "react-icons/bs";

import Chip from "./Chip";
import { useClientContext } from "../../contexts";
import { NoteDatabseType } from "@/types/notes";
import { formatDate, getISOWeekNumber } from "@/lib/utils";

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
  const { notes, filter } = useClientContext();
  const all = notes.length;
  const today = useMemo(() => getToday(notes), [notes]);
  const thisWeek = useMemo(() => getThisWeek(notes), [notes]);
  const thisMonth = useMemo(() => getThisMonth(notes), [notes]);

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-7">
      <Chip Icon={BsFillCalendarDateFill} title={filter + "今天"} value={today} color="#FF6D28" />
      <Chip Icon={BsFillCalendarDayFill} title={filter + "本周"} value={thisWeek} color="#FA2FB5" />
      <Chip Icon={BsFillCalendarMonthFill} title={filter + "本月"} value={thisMonth} color="#8758FF" />
      <Chip Icon={BsFillCalendarWeekFill} title={filter + "所有"} value={all} color="#42855B" />
    </section>
  );
}
