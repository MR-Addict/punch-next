import Link from "next/link";

import style from "./page.module.css";
import { setMetadata } from "@/lib/utils";
import { FcAddressBook, FcDataSheet, FcKindle } from "react-icons/fc";
import { IconType } from "react-icons/lib";

export const metadata = setMetadata();

function LinkCard({ Icon, title, subtitle, link }: { Icon: IconType; title: string; subtitle: string; link: string }) {
  return (
    <li>
      <Link href={link} className={style.card}>
        <Icon className={style.icon} />
        <h1 className={style.title}>{title}</h1>
        <p className={style.subtitle}>{subtitle}</p>
      </Link>
    </li>
  );
}

export default async function Page() {
  return (
    <main className="w-full px-4 md:px-48 flex-1 flex flex-col items-center justify-center">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <LinkCard Icon={FcAddressBook} title="提交笔记" subtitle="记录今天的值班内容" link="/form" />
        <LinkCard Icon={FcDataSheet} title="查看笔记" subtitle="去看本学期的值班笔记" link="/view" />
        <LinkCard Icon={FcKindle} title="笔记归档" subtitle="去看学长学姐的值班笔记" link="/archive" />
      </ul>
    </main>
  );
}
