"use client";

import Filter from "./components/Filter";
import Table from "@/components/Table/Table";
import Searchbar from "@/components/Table/Searchbar";

export default function Client() {
  return (
    <main className="flex-1 w-full py-10 px-4 md:px-48 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-3 animate-slideFromTop">
        <Searchbar />
        <Filter />
      </div>

      <Table />
    </main>
  );
}
