"use client";

import Link from "next/link";

import env from "@/types/env/client";
import getISOWeekNumber from "@/lib/utils/getISOWeekNumber";

export default function Logo() {
  const week = getISOWeekNumber(new Date()) - getISOWeekNumber(env.FIRST_WEEK) + 1;

  return (
    <div className="relative">
      <Link href="/" className="font-bold text-xl">
        值班笔记
      </Link>

      <p className="absolute top-0 -right-1 translate-x-full text-xs bg-cyan-600 rounded-lg px-1">{`第${week}周`}</p>
    </div>
  );
}
