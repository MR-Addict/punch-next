"use client";

import clsx from "clsx";

import Tabs from "./components/Tabs/Tabs";
import Table from "./components/Table/Table";
import Chips from "./components/Chips/Chips";
import Filter from "./components/Filter/Filter";
import Searchbar from "./components/Searchbar/Searchbar";
import AreaCharts from "./components/AreaCharts/AreaCharts";

import { useClientContext } from "./contexts/ClientContext";

export default function Client() {
  const { activeTab } = useClientContext();

  return (
    <main className="w-full flex-1 py-10 px-4 md:px-48 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs />
        <Filter />
      </div>

      <div className={clsx("flex-col gap-5", activeTab === "table" ? "flex" : "hidden")}>
        <Searchbar />
        <Table />
      </div>

      <div className={clsx("flex-col gap-5", activeTab === "chart" ? "flex" : "hidden")}>
        <Chips />
        <AreaCharts />
      </div>
    </main>
  );
}
