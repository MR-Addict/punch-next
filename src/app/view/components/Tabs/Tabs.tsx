"use client";

import clsx from "clsx";
import { IconType } from "react-icons/lib";
import { CiViewTable } from "react-icons/ci";
import { PiChartLine } from "react-icons/pi";

import style from "./Tabs.module.css";
import { useViewContext, TabType } from "@/contexts/View/ViewProvider";

function Tab({ Icon, tab }: { Icon: IconType; tab: TabType }) {
  const { activeTab, setActiveTab } = useViewContext();

  return (
    <button
      type="button"
      aria-label="tab"
      onClick={() => setActiveTab(tab)}
      className={clsx(style.tab, { [style.active]: activeTab === tab })}
    >
      <Icon size={20} />
    </button>
  );
}

export default function Tabs() {
  return (
    <div className="w-fit flex flex-row p-1 border border-gray-200 rounded-md">
      <Tab Icon={PiChartLine} tab="chart" />
      <Tab Icon={CiViewTable} tab="table" />
    </div>
  );
}
