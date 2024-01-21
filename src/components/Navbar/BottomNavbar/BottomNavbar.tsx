"use client";

import clsx from "clsx";
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
    <nav className="w-full sticky bottom-0 bg-white md:hidden">
      <ul className={clsx(style.links, { [style.scrollable]: scrollable })}>
        {links.map((link) => (
          <li key={link.name}>
            <a href={link.link} className={clsx(style.link, { [style.active]: rootPath === link.link })}>
              <link.Icon size={20} />
              <p>{link.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
