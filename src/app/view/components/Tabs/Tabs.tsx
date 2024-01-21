"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons/lib";
import { CiViewTable } from "react-icons/ci";
import { PiChartLine } from "react-icons/pi";

import style from "./Tabs.module.css";
import { useViewContext, TabType } from "@/contexts/View/ViewProvider";

function Tab({ Icon, tab }: { Icon: IconType; tab: TabType }) {
  const { activeTab, setActiveTab } = useViewContext();

  return (
    <button type="button" aria-label="tab" onClick={() => setActiveTab(tab)} className={style.tab}>
      {activeTab === tab && (
        <motion.div layoutId="active-tab" transition={{ duration: 0.1 }} className={style["active-tab"]} />
      )}
      <Icon size={20} />
    </button>
  );
}

export default function Tabs() {
  return (
    <div className="w-fit flex flex-row p-1 rounded-md bg-black/5 isolate">
      <Tab Icon={PiChartLine} tab="chart" />
      <Tab Icon={CiViewTable} tab="table" />
    </div>
  );
}
