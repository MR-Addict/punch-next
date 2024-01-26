"use client";

import Link from "next/link";
import { useMemo } from "react";

import style from "./Logo.module.css";
import getISOWeekNumber from "@/lib/utils/getISOWeekNumber";
import { useAppContext } from "@/contexts/App/AppProvider";
import clsx from "clsx";

export default function Logo() {
  const { env } = useAppContext();

  function getWeek(current: Date) {
    return getISOWeekNumber(new Date()) - getISOWeekNumber(current) + 1;
  }

  const week = useMemo(() => (env ? getWeek(env.FIRST_WEEK) : null), [env]);

  return (
    <div className="relative">
      <Link href="/">值班笔记</Link>

      {!week && <p className={clsx(style["logo-position"], style.skeleton)} />}
      {week && <p className={clsx(style["logo-position"], style.logo)}>{`第${week}周`}</p>}
    </div>
  );
}
