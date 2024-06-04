"use client";

import Tabs from "./components/Tabs/Tabs";
import Table from "./components/Table/Table";
import Chips from "./components/Chips/Chips";
import Filter from "./components/Filter/Filter";
import Message from "@/components/Message/Message";
import Searchbar from "./components/Searchbar/Searchbar";
import AreaCharts from "./components/AreaCharts/AreaCharts";
import Pagination from "./components/Pagination/Pagination";

import timeInterval from "@/lib/utils/timeInterval";
import { useViewContext } from "@/contexts/View/ViewProvider";

export default function Client() {
  const { activeTab, archives, lastModified } = useViewContext();

  if (archives.length === 0) {
    return (
      <main className="w-full flex-1 flex flex-col items-center justify-center">
        <Message message="这里还没有值班笔记哦，快去提交一个吧" icon="people" />
      </main>
    );
  }

  return (
    <main className="w-full flex-1 py-5 md:py-10 px-4 md:px-28 flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        {archives.length > 1 && <Filter />}
        <Tabs />
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {activeTab === "table" && (
          <>
            <Searchbar />
            <Table />
            <Pagination />
          </>
        )}
        {activeTab === "chart" && (
          <>
            <Chips />
            <AreaCharts />
          </>
        )}
      </div>

      <p className="mx-auto text-xs text-gray-600">数据库上次同步于{timeInterval(lastModified)}</p>
    </main>
  );
}
