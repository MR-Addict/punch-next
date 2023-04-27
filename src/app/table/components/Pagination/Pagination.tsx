import classNames from "classnames";

import { useClientContext } from "../../contexts";

export default function Pagination() {
  const leftSide = 1;
  const buttonsWidth = 5;
  const { notesPerpage, notes, totalPages, currentNotes, currentPage, setCurrentPage } = useClientContext();

  function Button({ page }: { page: number }) {
    return (
      <button
        type='button'
        onClick={() => {
          setCurrentPage(page);
          window.scroll({ top: 0, behavior: "auto" });
        }}
        className={classNames(
          { "text-cyan-600": page === currentPage },
          "w-7 h-7 place-items-center border border-gray-500"
        )}
      >
        {page + 1}
      </button>
    );
  }

  return (
    <div className='w-full flex flex-row items-center justify-between py-3 pl-2 pr-5 border border-gray-500 border-t-0'>
      <p className='text-sm'>
        {currentPage + 1}/{totalPages}页(共{notes.length}条记录)
      </p>
      <div className='flex flex-row items-center gap-2'>
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
