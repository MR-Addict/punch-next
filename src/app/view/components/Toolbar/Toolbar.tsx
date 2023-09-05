"use client";

import Tabs from "./components/Tabs/Tabs";
import Filter from "./components/Filter/Filter";

export default function Toolbar() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-2">
      <Tabs />
      <Filter />
    </div>
  );
}
