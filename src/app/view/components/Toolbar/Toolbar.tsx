"use client";

import Tabs from "./Tabs";
import Filter from "./Filter";

export default function Toolbar() {
  return (
    <div className="flex flex-row justify-between items-center">
      <Tabs />
      <Filter />
    </div>
  );
}
