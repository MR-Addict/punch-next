"use client";

import clsx from "clsx";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import style from "./Body.module.css";
import { useViewContext } from "@/contexts/View/ViewProvider";

import Table from "./components/Table/Table";
import Pagination from "./components/Pagination/Pagination";

function Skeleton() {
  return (
    <ul className={clsx(style.wrapper, style.loading)}>
      {new Array(9).fill(0).map((_, index) => (
        <li key={index} />
      ))}
    </ul>
  );
}

export default function Body() {
  const searchParams = useSearchParams();
  const { notes, pagination, refreshNotes } = useViewContext();

  useEffect(() => {
    refreshNotes();
  }, [searchParams]);

  if (notes === undefined) return <Skeleton />;
  if (notes === null) return <div className={clsx(style.wrapper, style.error)}>无法获取数据☠️</div>;
  if (!notes.length) return <div className={clsx(style.wrapper, style.error)}>这里空空如也😢</div>;

  return (
    <section className={style.wrapper}>
      <Table notes={notes} />
      <Pagination pagination={pagination} />
    </section>
  );
}
