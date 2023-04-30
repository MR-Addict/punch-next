"use client";

import { useMemo } from "react";

import AreaChart from "./AreaChart";
import { useViewContext } from "../../contexts";
import { groupBy, formatDate, getISOWeekNumber } from "@/lib/utils";

export default function AreaCharts() {
  const { notes, filter, firstWeek } = useViewContext();

  const notesGroupedByDay = useMemo(() => groupBy([...notes].reverse(), (note) => formatDate(note.date)), [notes]);
  const notesGroupedByWeek = useMemo(
    () => groupBy([...notes].reverse(), (note) => `第${getISOWeekNumber(note.date) - getISOWeekNumber(firstWeek)}周`),
    [notes]
  );

  const dayLabels = useMemo(() => {
    return notesGroupedByDay.map((item) => {
      const [month, day] = item.category.slice(5).split("-");
      return Number(month) + "." + Number(day);
    });
  }, [notesGroupedByDay]);

  const weekLabels = useMemo(() => notesGroupedByWeek.map((item) => item.category), [notesGroupedByWeek]);

  return (
    <div className='flex flex-col gap-10 animate-slideFromBottom'>
      <AreaChart title={filter + "每日提交"} data={notesGroupedByDay.map((item) => item.count)} labels={dayLabels} />
      <AreaChart title={filter + "每周提交"} data={notesGroupedByWeek.map((item) => item.count)} labels={weekLabels} />
    </div>
  );
}
