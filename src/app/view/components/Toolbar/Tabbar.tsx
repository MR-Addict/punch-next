"use client";

import classNames from "classnames";

import style from "./Tabbar.module.css";
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

export default function Tabbar() {
  return (
    <div className='flex flex-row gap-2'>
      <Tab title='表格' tab='table' />
      <Tab title='图表' tab='chart' />
    </div>
  );
}
