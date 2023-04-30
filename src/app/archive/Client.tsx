"use client";

import { Table, Toolbar } from "./components";

export default function Client() {
  return (
    <main className='flex-1 w-full py-10 px-4 md:px-48 flex flex-col gap-5'>
      <Toolbar />
      <Table />
    </main>
  );
}
