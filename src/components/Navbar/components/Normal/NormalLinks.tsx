"use client";

import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

import links from "../../config";

export default function NormalLinks() {
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <ul className="hidden md:flex flex-row gap-4">
      {links.map((item) => (
        <li
          key={item.name}
          className={classNames("font-semibold text-lg", { "text-cyan-600": rootPath === item.link })}
        >
          <Link href={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}
