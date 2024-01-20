import style from "./TopNavbar.module.css";

import Logo from "./components/Logo/Logo";
import Links from "./components/Links/Links";
import Github from "./components/Github/Github";

export default function TopNavbar() {
  return (
    <nav className={style.nav}>
      <Logo />
      <Links />
      <Github />
    </nav>
  );
}
