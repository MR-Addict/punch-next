"use client";

import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import links from "../config";
import style from "./BottomNavbar.module.css";

export default function BottomNavbar() {
  const [scrollable, setScrollable] = useState(false);
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  useEffect(() => {
    function handleScroll() {
      const isScrollable = window.innerHeight < document.body.scrollHeight;
      const isScrolledToBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight;
      setScrollable(isScrollable && !isScrolledToBottom);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full sticky bottom-0 gradient-100 md:hidden">
      <ul className={clsx(style.links, { [style.scrollable]: scrollable })}>
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.link} className={style.link}>
              {rootPath === link.link && <motion.div layoutId="active-bottom-link" className={style["active-link"]} />}
              <link.Icon size={20} />
              <p>{link.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
