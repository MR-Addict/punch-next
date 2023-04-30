"use client";

import classNames from "classnames";

import { useClientContext } from "./contexts";
import { Table, Searchbar, Toolbar, Chips, AreaCharts } from "./components";

export default function Client() {
  const { activeTab } = useClientContext();

  return (
    <div className='w-full flex flex-col gap-5'>
      <Toolbar />

      <div className={classNames("flex-col gap-5", activeTab === "table" ? "flex" : "hidden")}>
        <Searchbar />
        <Table />
      </div>

      <div className={classNames("flex-col gap-5", activeTab === "chart" ? "flex" : "hidden")}>
        <Chips />
        <AreaCharts />
      </div>
    </div>
  );
}
