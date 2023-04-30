import Link from "next/link";

import data from "./config";
import style from "./page.module.css";

export default function Page() {
  return (
    <main className='flex-1 w-full py-10 px-4 md:px-48 flex flex-col gap-1'>
      <h1 className='font-semibold text-lg'>历史归档</h1>

      <ul>
        {data.map((item) => (
          <li key={item.name} className={style.list}>
            <Link href={`/archive/${item.name}`} className='hover:underline'>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
