import Link from "next/link";
import Image from "next/image";
import { BsGithub } from "react-icons/bs";

import logo from "./logo.svg";
import MobileLinks from "./Mobile/MobileLinks";
import NormalLinks from "./Normal/NormalLinks";

export default function Navbar() {
  return (
    <nav className='w-full px-4 md:px-48 pt-4 md:pt-7 flex flex-row items-center justify-between isolate'>
      <Link href='/'>
        <Image src={logo} alt='logo' height={26} />
      </Link>

      <NormalLinks />
      <div className='flex flex-row items-center gap-5'>
        <a aria-label='github' href='https://github.com/MR-Addict/punch-next' className='text-white'>
          <BsGithub size={22} />
        </a>
        <MobileLinks />
      </div>
    </nav>
  );
}
