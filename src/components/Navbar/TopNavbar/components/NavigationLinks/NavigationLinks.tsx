"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import links from "../../../config";
import style from "./NavigationLinks.module.css";

export default function NavigationLinks() {
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <div className="ml-auto hidden lg:flex flex-row items-center gap-4">
      <ul className="flex">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.link} className={style.link}>
              {rootPath === link.link && <motion.div layoutId="active-top-link" className={style["active-link"]} />}
              <link.Icon size={20} />
              <p>{link.name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mr-4 text-neutral-300">|</p>
    </div>
  );
}
