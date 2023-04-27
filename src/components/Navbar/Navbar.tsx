import Link from "next/link";
import Image from "next/image";
import { BsGithub } from "react-icons/bs";

import logo from "./logo.svg";

export default function Navbar() {
  return (
    <nav className='w-full px-5 md:px-48 pt-5 flex flex-row justify-between'>
      <Link href='/'>
        <Image src={logo} alt='logo' height={26} />
      </Link>

      <a aria-label='github' href='https://github.com/MR-Addict/punch-next' className='text-white'>
        <BsGithub size={22} />
      </a>
    </nav>
  );
}
