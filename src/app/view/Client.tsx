"use client";

import classNames from "classnames";

import Table from "@/components/Table/Table";
import Message from "@/components/Message/Message";
import Searchbar from "@/components/Table/Searchbar";

import Chips from "./components/Chips/Chips";
import Toolbar from "./components/Toolbar/Toolbar";
import AreaCharts from "./components/AreaCharts/AreaCharts";

import { useClientContext } from "./contexts/ClientContext";

export default function Client() {
  const { rawNotes, activeTab } = useClientContext();

  if (rawNotes.length === 0) {
    return (
      <main className="w-full flex-1 flex flex-col items-center justify-center">
        <Message message="这里还没有值班笔记哦，快去提交一个吧" icon="people" />
      </main>
    );
  }

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
