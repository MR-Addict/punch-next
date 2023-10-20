"use client";

import { useMemo } from "react";

import AreaChart from "./AreaChart";
import groupBy from "@/lib/utils/groupBy";
import formatDate from "@/lib/utils/formatDate";
import { useViewContext } from "@/contexts/View/ViewProvider";

export default function AreaCharts() {
  const { notes } = useViewContext();

  const notesGroupedByDay = useMemo(() => groupBy([...notes].reverse(), (note) => formatDate(note.date)), [notes]);
  const notesGroupedByWeek = useMemo(() => groupBy([...notes].reverse(), (note) => `第${note.week}周`), [notes]);

  const dayLabels = useMemo(() => {
    return notesGroupedByDay.map((item) => {
      const [month, day] = item.category.slice(5).split("-");
      return Number(month) + "." + Number(day);
    });
  }, [notesGroupedByDay]);

  const weekLabels = useMemo(() => notesGroupedByWeek.map((item) => item.category), [notesGroupedByWeek]);

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
      <AreaChart title="每日提交曲线" data={notesGroupedByDay.map((item) => item.count)} labels={dayLabels} />
      <AreaChart title="每周提交曲线" data={notesGroupedByWeek.map((item) => item.count)} labels={weekLabels} />
    </div>
  );
}
