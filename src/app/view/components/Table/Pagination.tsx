"use client";

import clsx from "clsx";

import { useTableContext } from "@/contexts/Table/TableProvider";

export default function Pagination() {
  const leftSide = 1;
  const buttonsWidth = 5;
  const { notes, totalPages, currentNotes, currentPage, setCurrentPage } = useTableContext();

  function Button({ page }: { page: number }) {
    return (
      <button
        type="button"
        onClick={() => {
          if (page === currentPage) return;
          setCurrentPage(page);
          window.scroll({ top: 0, behavior: "auto" });
        }}
        className={clsx(
          { "text-cyan-600 bg-dark": page === currentPage },
          "w-7 h-7 place-items-center rounded-md border border-dark"
        )}
      >
        {page + 1}
      </button>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 rounded-b-md">
      <p>
        {currentPage + 1}/{totalPages}页 (共{notes.length}条记录)
      </p>

      <div className="flex flex-row items-center gap-2">
        {/* first button */}
        {currentNotes.length > 0 && <Button page={0} />}

        {/* dots */}
        {totalPages > buttonsWidth + 2 && currentPage - Math.floor(buttonsWidth / 2) > leftSide && (
          <div className="place-items-center">...</div>
        )}

        {/* other buttons */}
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

        {/* last button show only page are more than one page */}
        {totalPages > 1 && <Button page={totalPages - 1} />}
      </div>
    </div>
  );
}
