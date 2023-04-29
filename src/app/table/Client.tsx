"use client";

import { Table, Toolbar } from "./components";

export default function Client() {
  return (
    <main className='flex-1 w-full px-4 md:px-48 py-10 flex flex-col gap-1'>
      <div className='w-full flex flex-col md:p-5 md:rounded-lg md:bg-dark animate-slideFromBottom'>
        <Toolbar />
        <Table />
      </div>
    </main>
  );
}
