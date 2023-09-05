"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import links from "../../config";

export default function NormalLinks() {
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <ul className="hidden md:flex flex-row gap-4">
      {links.map((item) => (
        <li key={item.name} className={clsx("font-semibold text-lg", { "text-cyan-600": rootPath === item.link })}>
          <Link href={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}
