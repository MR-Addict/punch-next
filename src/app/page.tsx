import Link from "next/link";

import style from "./page.module.css";
import { setMetadata } from "@/lib/utils";
import { FcAddressBook, FcDataSheet, FcKindle } from "react-icons/fc";

export const metadata = setMetadata();

export default async function Page() {
  return (
    <main className="w-full px-4 md:px-48 py-10 flex-1 flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <Link href="/form" className={style.card}>
          <FcAddressBook className={style.icon} />
          <h1 className={style.title}>提交笔记</h1>
          <p className={style.subtitle}>记录今天的值班内容</p>
        </Link>

        <Link href="/view" className={style.card}>
          <FcDataSheet className={style.icon} />
          <h1 className={style.title}>查看笔记</h1>
          <p className={style.subtitle}>去看本学期的值班笔记</p>
        </Link>

        <Link href="/archive" className={style.card}>
          <FcKindle className={style.icon} />
          <h1 className={style.title}>笔记归档</h1>
          <p className={style.subtitle}>去看学长学姐的值班笔记</p>
        </Link>
      </div>
    </main>
  );
}
