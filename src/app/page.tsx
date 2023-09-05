import Link from "next/link";
import { IconType } from "react-icons/lib";
import { FcAddressBook, FcOvertime } from "react-icons/fc";

import style from "./page.module.css";
import setMetadata from "@/lib/utils/setMetadata";

export const metadata = setMetadata();

function LinkCard({ Icon, title, subtitle, link }: { Icon: IconType; title: string; subtitle: string; link: string }) {
  return (
    <li>
      <Link href={link} className={style.card}>
        <Icon size={90} />

        <div className="flex flex-col md:items-center gap-1">
          <h1 className="font-semibold text-lg">{title}</h1>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </Link>
    </li>
  );
}

export default function Page() {
  return (
    <main className="w-full px-4 md:px-48 flex-1 flex flex-col items-center justify-center">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <LinkCard Icon={FcAddressBook} title="提交笔记" subtitle="记录今天的值班内容" link="/form" />
        <LinkCard Icon={FcOvertime} title="查看笔记" subtitle="去看所有的值班的笔记" link="/view" />
      </ul>
    </main>
  );
}
