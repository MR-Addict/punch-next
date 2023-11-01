"use client";

import style from "./Table.module.css";
import formatDate from "@/lib/utils/formatDate";
import { useTableContext } from "@/contexts/Table/TableProvider";

import Pagination from "../Pagination/Pagination";

export default function Table() {
  const { currentNotes, currentPage, notesPerpage, totalPages } = useTableContext();

  if (currentNotes.length === 0) return <h1 className="w-full text-center py-28 rounded-sm">没有符合条件的结果</h1>;

  return (
    <div className="w-full animate-slideFromBottom space-y-5">
      <div className="w-full overflow-x-auto bg-dark rounded-md">
        <table className={style.table}>
          <thead>
            <tr>
              <th>序号</th>
              <th>姓名</th>
              <th>周数</th>
              <th>日期</th>
              <th>值班笔记</th>
            </tr>
          </thead>
          <tbody>
            {currentNotes.map((note, index) => (
              <tr key={note._id}>
                <td>{currentPage * notesPerpage + index + 1}</td>
                <td>{note.name}</td>
                <td>{`第${note.week}周`}</td>
                <td>{formatDate(note.date)}</td>
                <td className="max-w-md min-w-[20rem] whitespace-break-spaces">{note.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && <Pagination />}
    </div>
  );
}
