"use client";

import Link from "next/link";
import classNames from "classnames";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { AiOutlineCloseCircle } from "react-icons/ai";

import links from "../../config";
import style from "./MobileLinks.module.css";

export default function MobileLinks() {
  const [isExpandMenu, setIsExpandMenu] = useState(false);
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  function handleClick() {
    const nowMenuState = !isExpandMenu;
    setIsExpandMenu(nowMenuState);
    document.body.style.overflow = nowMenuState ? "hidden" : "auto";
  }

  return (
    <div className="md:hidden flex items-center justify-center">
      <button type="button" aria-label="menu button" className={style["menu-btn"]} onClick={handleClick}>
        <AiOutlineCloseCircle className={classNames(style["menu-icon"], { [style.active]: isExpandMenu })} />
        <HiMenuAlt3 className={classNames(style["menu-icon"], { [style.active]: !isExpandMenu })} />
      </button>

      <ul className={classNames(style.menu, { [style.active]: isExpandMenu })}>
        {links.map((item) => (
          <li key={item.name} className={classNames(style.link, { [style.active]: rootPath === item.link })}>
            <Link href={item.link} onClick={() => setIsExpandMenu(rootPath === item.link)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
