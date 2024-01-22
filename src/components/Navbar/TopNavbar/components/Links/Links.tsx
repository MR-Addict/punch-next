"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import style from "./Links.module.css";
import links from "../../../config";

export default function Links() {
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <div className="ml-auto hidden md:flex flex-row items-center gap-4">
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
      <p className="mr-4 text-gray-300">|</p>
    </div>
  );
}
