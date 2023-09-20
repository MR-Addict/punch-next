"use client";

import clsx from "clsx";

import style from "./Tabs.module.css";
import { useViewContext, TabType } from "@/contexts/View/ViewProvider";

function Tab({ title, tab }: { title: string; tab: TabType }) {
  const { activeTab, setActiveTab } = useViewContext();

  return (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={clsx(style.tab, { [style.active]: activeTab === tab })}
    >
      <h1>{title}</h1>
    </button>
  );
}

export default function Tabs() {
  return (
    <div className="w-fit flex flex-row border border-gray-500">
      <Tab title="表格" tab="table" />
      <Tab title="图表" tab="chart" />
    </div>
  );
}
