"use client";

import { Table, Searchbar, Filter } from "./components";

export default function Client() {
  return (
    <main className='flex-1 w-full py-10 px-4 md:px-48 flex flex-col gap-5'>
      <div className='flex flex-row gap-3'>
        <Searchbar />
        <Filter />
      </div>

      <Table />
    </main>
  );
}
