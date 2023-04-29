"use client";

import { useClientContext } from "./contexts";
import { Table, Searchbar, Toolbar, Chips, AreaChart } from "./components";

export default function Client() {
  const { activeTab } = useClientContext();

  return (
    <main className='flex-1 w-full px-4 md:px-48 py-10 flex flex-col gap-5'>
      <Toolbar />

      {activeTab === "table" ? (
        <div className='flex flex-col gap-5 bg-dark p-5 rounded-xl'>
          <Searchbar />
          <Table />
        </div>
      ) : (
        <div className='flex flex-col gap-5'>
          <Chips />
          <AreaChart />
        </div>
      )}
    </main>
  );
}
