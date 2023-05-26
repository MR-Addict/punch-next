"use client";

import { useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";

export default function Error({ error }: { error: Error }) {
  useEffect(() => console.error(error), [error]);

  return (
    <main aria-label="error page" className="w-full flex-1 flex flex-col items-center justify-center gap-3">
      <button
        type="button"
        aria-label="reset button"
        onClick={() => location.reload()}
        className="text-white shadow-[0_0_5px_#0891b2] border border-cyan-600 duration-300 rounded-full p-0.5"
      >
        <IoMdRefresh size={37} />
      </button>
      <p>请尝试刷新或联系管理员</p>
    </main>
  );
}
