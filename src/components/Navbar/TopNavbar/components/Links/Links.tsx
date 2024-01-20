"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import links from "../../../config";

export default function Links() {
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <div className="ml-auto hidden md:flex flex-row items-center gap-4">
      <ul className="flex flex-row gap-4">
        {links.map((item) => (
          <li key={item.name} className={clsx("text-black", { "text-gray-500": rootPath !== item.link })}>
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <p className="mr-4 text-gray-200">|</p>
    </div>
  );
}
