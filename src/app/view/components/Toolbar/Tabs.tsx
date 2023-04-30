"use client";

import classNames from "classnames";

import style from "./Tabs.module.css";
import type { TabType } from "../../contexts";
import { useClientContext } from "../../contexts";

function Tab({ title, tab }: { title: string; tab: TabType }) {
  const { activeTab, setActiveTab } = useClientContext();

  return (
    <button
      type='button'
      onClick={() => setActiveTab(tab)}
      className={classNames(style.tab, { [style.active]: activeTab === tab })}
    >
      <h1>{title}</h1>
    </button>
  );
}

export default function Tabs() {
  return (
    <div className='flex flex-row gap-3'>
      <Tab title='图表' tab='chart' />
      <Tab title='表格' tab='table' />
    </div>
  );
}
