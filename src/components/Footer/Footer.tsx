"use client";

export default function Footer() {
  return (
    <footer className="hidden md:flex gap-1 pb-2 text-sm">
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
