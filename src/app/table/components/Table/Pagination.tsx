"use client";

import classNames from "classnames";

import { useClientContext } from "../../contexts";

export default function Pagination() {
  const leftSide = 1;
  const buttonsWidth = 5;
  const { notes, totalPages, currentNotes, currentPage, setCurrentPage } = useClientContext();

  function Button({ page }: { page: number }) {
    return (
      <button
        type='button'
        onClick={() => {
          if (page === currentPage) return;
          setCurrentPage(page);
          window.scroll({ top: 0, behavior: "smooth" });
        }}
        className={classNames(
          { "text-cyan-600": page === currentPage },
          "w-6 h-6 place-items-center border border-gray-500"
        )}
      >
        {page + 1}
      </button>
    );
  }

  if (notes.length === 0) return <></>;

  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-between gap-2 text-sm py-3 pl-2 pr-5 border border-gray-500 border-t-0 rounded-b-sm'>
      <p>
        {currentPage + 1}/{totalPages}页 (共{notes.length}条记录)
      </p>

      <div className='flex flex-row items-center gap-1.5'>
        {/* first button */}
        {currentNotes.length > 0 && <Button page={0} />}

        {/* dots */}
        {totalPages > buttonsWidth + 2 && currentPage - Math.floor(buttonsWidth / 2) > leftSide && (
          <div className='place-items-center'>...</div>
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
          <div className='place-items-center'>...</div>
        )}

        {/* last button show only page are more than one page */}
        {totalPages > 1 && <Button page={totalPages - 1} />}
      </div>
    </div>
  );
}
