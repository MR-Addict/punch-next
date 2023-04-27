import { formatDate } from "@/lib/utils";

import style from "./Table.module.css";
import { useClientContext } from "../../contexts";

export default function Table() {
  const { currentNotes, currentPage, notesPerpage } = useClientContext();

  return (
    <>
      {/* got results */}
      {currentNotes.length > 0 && (
        <section className='w-full overflow-x-auto border border-b-0 border-gray-500'>
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
                  <td className='max-w-sm whitespace-break-spaces'>{note.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* no results */}
      {currentNotes.length === 0 && <h1 className='my-auto'>暂无结果</h1>}
    </>
  );
}
