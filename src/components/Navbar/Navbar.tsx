import { BsGithub } from "react-icons/bs";

import Logo from "./components/Logo/Logo";
import MobileLinks from "./components/Mobile/MobileLinks";
import NormalLinks from "./components/Normal/NormalLinks";

export default function Navbar() {
  return (
    <nav className="w-full px-4 md:px-28 pt-4 md:pt-7 flex flex-row items-center justify-between isolate">
      <Logo />
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
