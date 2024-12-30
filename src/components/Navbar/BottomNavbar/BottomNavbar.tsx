"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import links from "../config";
import style from "./BottomNavbar.module.css";

export default function BottomNavbar() {
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <nav className="w-full sticky bottom-0 gradient-50 lg:hidden">
      <ul className={style.links}>
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.link} className={style.link}>
              {rootPath === link.link && <motion.div layoutId="active-bottom-link" className={style["active-link"]} />}
              <link.Icon size={18} />
              <p>{link.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
