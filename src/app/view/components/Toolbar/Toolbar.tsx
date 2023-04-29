"use client";

import Tabbar from "./Tabbar";
import Filter from "./Filter";

export default function Toolbar() {
  return (
    <div className='flex flex-row justify-between items-center'>
      <Tabbar />
      <Filter />
    </div>
  );
}
