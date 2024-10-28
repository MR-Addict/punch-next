"use client";

import clsx from "clsx";

import style from "./Pagination.module.css";
import { useTableContext } from "@/contexts/Table/TableProvider";

export default function Pagination() {
  const leftSide = 1;
  const buttonsWidth = 5;
  const { notes, totalPages, currentNotes, currentPage, setCurrentPage } = useTableContext();

  function handleClick(page: number) {
    if (page === currentPage) return;
    setCurrentPage(page);
    window.scroll({ top: 0, behavior: "instant" });
  }

  function Button({ page }: { page: number }) {
    return (
      <button
        type="button"
        onClick={() => handleClick(page)}
        className={clsx(style.btn, { [style.active]: page === currentPage })}
      >
        {page + 1}
      </button>
    );
  }

  if (totalPages <= 1) return <></>;

  return (
    <div className={style.wrapper}>
      <p className="text-gray-700">
        {currentPage + 1}/{totalPages}页 (共{notes.length}条记录)
      </p>

      <div className="flex flex-row items-center gap-3">
        {/* first button */}
        {currentNotes.length > 0 && <Button page={0} />}

        {/* dots */}
        {totalPages > buttonsWidth + 2 && currentPage - Math.floor(buttonsWidth / 2) > leftSide && (
          <div className="place-items-center">...</div>
        )}

        {/* middle buttons */}
        {Array.from(Array(totalPages)).map((item, index) => {
          const rightSide = Math.max(totalPages - 1, leftSide);

          let pageBegin = leftSide;
          if (currentPage - leftSide > 2) pageBegin = Math.max(currentPage - Math.floor(buttonsWidth / 2), leftSide);
          let pageEnd = Math.min(pageBegin + buttonsWidth, rightSide);
          if (pageEnd - pageBegin < buttonsWidth) pageBegin = Math.max(pageEnd - buttonsWidth, leftSide);
          if (index >= pageBegin && index < pageEnd) return <Button key={index} page={index} />;
        })}

        {/* dots */}
        {totalPages > buttonsWidth + 2 && currentPage + Math.ceil(buttonsWidth / 2) < totalPages - 1 && (
          <div className="place-items-center">...</div>
        )}

        {/* last button, only display when there are more than one page */}
        {totalPages > 1 && <Button page={totalPages - 1} />}
      </div>
    </div>
  );
}
