"use client";

import classNames from "classnames";

export default function Footer({ mobile = false }: { mobile?: boolean }) {
  return (
    <footer className={classNames("space-x-1 pb-2 text-sm", mobile ? "flex" : "hidden md:flex")}>
      <p>
        <span>Copyright &copy; {new Date().getFullYear()} </span>
        <a href="https://github.com/NJTUSTAS" className="underline">
          校大学生科协
        </a>
      </p>

      <p>•</p>

      <a href="https://github.com/MR-Addict" className="underline">
        MR-Addict
      </a>
    </footer>
  );
}
