"use client";

import { Pagination, Table } from "./components";

export default function Client() {
  return (
    <main className='flex-1 w-full px-4 md:px-48 py-5 md:py-10 flex flex-col gap-1'>
      <section className='w-full flex flex-col p-5 rounded-lg bg-[#33373e]'>
        <Table />
        <Pagination />
      </section>
    </main>
  );
}
