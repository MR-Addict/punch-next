"use client";

import Link from "next/link";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { AiOutlineCloseCircle } from "react-icons/ai";

import links from "../../config";
import style from "./MobileLinks.module.css";
import { Footer } from "@/components";

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
        <AiOutlineCloseCircle className={classNames(style["menu-icon"], { [style.active]: isExpandMenu })} />
        <HiMenuAlt3 className={classNames(style["menu-icon"], { [style.active]: !isExpandMenu })} />
      </button>

      <div className={classNames(style.menu, { [style.active]: isExpandMenu })}>
        <ul className="flex items-center flex-col gap-7">
          {links.map((item) => (
            <li key={item.name} className={classNames(style.link, { [style.active]: rootPath === item.link })}>
              <Link href={item.link} onClick={() => setIsExpandMenu(rootPath === item.link)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <Footer mobile={true} />
      </div>
    </div>
  );
}
