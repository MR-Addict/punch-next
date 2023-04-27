"use client";

import Link from "next/link";
import classNames from "classnames";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { AiOutlineCloseCircle } from "react-icons/ai";

import links from "../config";
import style from "./MobileLinks.module.css";

export default function MobileLinks() {
  const [isExpandMenu, setIsExpandMenu] = useState(false);
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <div className='md:hidden flex items-center justify-center'>
      <button aria-label='menu button' onClick={() => setIsExpandMenu(!isExpandMenu)} type='button'>
        {isExpandMenu ? <AiOutlineCloseCircle size={26} /> : <HiMenuAlt3 size={26} />}
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
