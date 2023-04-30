"use client";

import classNames from "classnames";

import { useClientContext } from "./contexts";
import { Table, Searchbar, Toolbar, Chips, AreaCharts } from "./components";

export default function Client() {
  const { activeTab } = useClientContext();

  return (
    <main className='flex-1 w-full px-4 md:px-48 py-10 flex flex-col gap-5'>
      <Toolbar />

      <div className={classNames("flex-col gap-5", activeTab === "chart" ? "flex" : "hidden")}>
        <Chips />
        <AreaCharts />
      </div>

      <div className={classNames("flex-col gap-5", activeTab === "table" ? "flex" : "hidden")}>
        <Searchbar />
        <Table />
      </div>
    </main>
  );
}
