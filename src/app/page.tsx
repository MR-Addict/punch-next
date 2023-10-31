import Link from "next/link";
import { FcAddressBook, FcOvertime } from "react-icons/fc";

import style from "./page.module.css";
import setMetadata from "@/lib/utils/setMetadata";
import HalloweenIcon from "@/components/Icons/HalloweenIcon";

export const metadata = setMetadata();

interface Props {
  Icon: JSX.Element;
  title: string;
  subtitle: string;
  link: string;
}

function LinkCard({ Icon, title, subtitle, link }: Props) {
  return (
    <li>
      <Link href={link} className={style.card}>
        {Icon}
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
    <main className="w-full px-4 md:px-28 flex-1 flex flex-col items-center justify-center">
      <ul className="flex flex-row justify-center flex-wrap gap-5 md:gap-10">
        <LinkCard Icon={<FcAddressBook size={90} />} title="提交笔记" subtitle="记录今天的值班内容" link="/form" />
        <LinkCard Icon={<FcOvertime size={90} />} title="查看笔记" subtitle="去看大家的值班笔记" link="/view" />
        <LinkCard Icon={<HalloweenIcon size={90} />} title="万圣节快乐" subtitle="Happy Halloween!" link="/" />
      </ul>
    </main>
  );
}
