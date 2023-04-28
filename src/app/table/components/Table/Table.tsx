"use client";

import { formatDate } from "@/lib/utils";

import style from "./Table.module.css";
import Pagination from "./Pagination";
import { useClientContext } from "../../contexts";

export default function Table() {
  const { currentNotes, currentPage, notesPerpage } = useClientContext();

  return (
    <section className='w-full bg-[#33373e]'>
      {/* got results */}
      {currentNotes.length > 0 && (
        <div className='w-full overflow-x-auto border border-b-0 border-gray-500'>
          <table className={style.table}>
            <thead>
              <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>组别</th>
                <th>日期</th>
                <th>值班笔记</th>
              </tr>
            </thead>
            <tbody>
              {currentNotes.map((note, index) => (
                <tr key={note._id}>
                  <td>{currentPage * notesPerpage + index + 1}</td>
                  <td>{note.name}</td>
                  <td>{note.group}</td>
                  <td>{formatDate(note.date)}</td>
                  <td className='max-w-md min-w-[18rem] whitespace-break-spaces'>{note.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* no results */}
      {currentNotes.length === 0 && (
        <h1 className='w-full text-center py-3 border border-gray-500 rounded-sm'>没有符合条件的结果</h1>
      )}

      <Pagination />
    </section>
  );
}
