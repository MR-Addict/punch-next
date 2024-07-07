"use client";

import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import links from "../config";
import style from "./BottomNavbar.module.css";
import { useTelegramWebAppContext } from "@/contexts/TelegramWebApp/TelegramWebAppProvider";

export default function BottomNavbar() {
  const { webApp } = useTelegramWebAppContext();
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <nav className="w-full sticky bottom-0 bg-purple-50 md:hidden">
      <ul className={clsx(style.links, { [style["tg-web-app"]]: webApp?.initData })}>
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
