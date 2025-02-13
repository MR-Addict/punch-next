"use client";

import { useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";

export default function Error({ error }: { error: Error }) {
  useEffect(() => console.error(error), [error]);

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-center gap-3 text-gray-800">
      <button
        type="button"
        aria-label="reset button"
        onClick={() => location.reload()}
        className="rounded-full p-0.5 gradient-50 shadow-md hover:text-gray-900 duration-300"
      >
        <IoMdRefresh size={37} />
      </button>
      <p>请尝试刷新或联系管理员</p>
    </main>
  );
}
