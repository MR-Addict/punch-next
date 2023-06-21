"use client";

import classNames from "classnames";

import { Message } from "@/components";
import { useClientContext } from "./contexts";
import { Table, Searchbar, Toolbar, Chips, AreaCharts } from "./components";

export default function Client() {
  const { rawNotes, activeTab } = useClientContext();

  if (rawNotes.length === 0)
    return (
      <main className="w-full flex-1 flex flex-col items-center justify-center">
        <Message message="本学期还没有人提交值班笔记哦" icon="people" />
      </main>
    );

  return (
    <main className="w-full flex-1 py-10 px-4 md:px-48 flex flex-col gap-5">
      <Toolbar />

      <div className={classNames("flex-col gap-5", activeTab === "table" ? "flex" : "hidden")}>
        <Searchbar />
        <Table />
      </div>

      <div className={classNames("flex-col gap-5", activeTab === "chart" ? "flex" : "hidden")}>
        <Chips />
        <AreaCharts />
      </div>
    </main>
  );
}
