import Link from "next/link";
import { BsGithub } from "react-icons/bs";

import { MobileLinks, NormalLinks } from "./components";

export default function Navbar() {
  return (
    <nav className="w-full px-4 md:px-48 pt-4 md:pt-7 flex flex-row items-center justify-between isolate">
      <Link href="/" className="font-bold text-xl">
        值班笔记
      </Link>

      <NormalLinks />

      <div className="flex flex-row items-center gap-5">
        <a aria-label="github" href="https://github.com/MR-Addict/punch-next" className="text-white">
          <BsGithub size={22} />
        </a>
        <MobileLinks />
      </div>
    </nav>
  );
}
