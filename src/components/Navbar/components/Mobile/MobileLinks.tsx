"use client";

import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { AiOutlineCloseCircle } from "react-icons/ai";

import links from "../../config";
import style from "./MobileLinks.module.css";

export default function MobileLinks() {
  const [isExpandMenu, setIsExpandMenu] = useState(false);
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  useEffect(() => {
    document.body.style.overflow = isExpandMenu ? "hidden" : "auto";
  }, [isExpandMenu]);

  return (
    <div className="md:hidden flex items-center justify-center">
      <button
        type="button"
        aria-label="menu button"
        className={style["menu-btn"]}
        onClick={() => setIsExpandMenu(!isExpandMenu)}
      >
        <AiOutlineCloseCircle className={clsx(style["menu-icon"], { [style.active]: isExpandMenu })} />
        <HiMenuAlt3 className={clsx(style["menu-icon"], { [style.active]: !isExpandMenu })} />
      </button>

      <ul className={clsx(style.menu, { [style.active]: isExpandMenu })}>
        {links.map((item) => (
          <li key={item.name} className={clsx(style.link, { [style.active]: rootPath === item.link })}>
            <Link href={item.link} onClick={() => setIsExpandMenu(rootPath === item.link)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
