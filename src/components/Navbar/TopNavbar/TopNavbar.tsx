import style from "./TopNavbar.module.css";

import Logo from "./components/Logo/Logo";
import IconLinks from "./components/IconLinks/IconLinks";
import NavigationLinks from "./components/NavigationLinks/NavigationLinks";

export default function TopNavbar() {
  return (
    <nav className={style.nav}>
      <Logo />
      <NavigationLinks />
      <IconLinks />
    </nav>
  );
}
