"use client";

import Link from "next/link";

import { config } from "@/config";
import { getISOWeekNumber } from "@/lib/utils";

export default function Logo() {
  const firstWeek = getISOWeekNumber(config.start);
  const currentWeek = getISOWeekNumber(new Date());
  const termWeek = currentWeek - firstWeek + 1;

  return (
    <div className="relative">
      <Link href="/" className="font-bold text-xl">
        值班笔记
      </Link>

      <div className="absolute top-0 -right-1 translate-x-full text-xs bg-cyan-600 rounded-lg px-1">
        {"第" + termWeek + "周"}
      </div>
    </div>
  );
}
