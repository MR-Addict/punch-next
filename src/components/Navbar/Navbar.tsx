import Link from "next/link";
import { BsGithub } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className='w-full px-5 md:px-48 pt-5 flex flex-row justify-between'>
      <Link href='/' className='text-cyan-600 text-lg font-semibold'>
        技术开发部
      </Link>

      <a aria-label='github' href='https://github.com/MR-Addict/punch-next' className='text-white'>
        <BsGithub size={22} />
      </a>
    </nav>
  );
}
