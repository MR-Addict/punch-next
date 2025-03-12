import { BsGithub } from "react-icons/bs";

import style from "./IconLinks.module.css";

export default function IconLinks() {
  return (
    <div className={style.wrapper}>
      <a aria-label="github" href="https://github.com/MR-Addict/punch-next" className={style.link}>
        <BsGithub size={22} />
      </a>
    </div>
  );
}
