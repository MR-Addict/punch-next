import Link from "next/link";

import style from "./page.module.css";
import { FcAddressBook, FcDataSheet } from "react-icons/fc";

export default async function Page() {
  return (
    <main className="w-full px-4 md:px-48 flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-row gap-6 md:gap-10">
        <Link href="/form" className={style.card}>
          <FcAddressBook size={60} />
          <h1 className={style.title}>提交笔记</h1>
        </Link>

        <Link href="/view" className={style.card}>
          <FcDataSheet size={60} />
          <h1 className={style.title}>查看笔记</h1>
        </Link>
      </div>
    </main>
  );
}
