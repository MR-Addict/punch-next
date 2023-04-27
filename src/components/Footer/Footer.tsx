"use client";

export default function Footer() {
  return (
    <footer className='w-full flex flex-row justify-center gap-1 pb-2 text-sm'>
      <p>Copyright &copy; {new Date().getFullYear()} 校大学生科协</p>
      <p>•</p>
      <a href='https://github.com/MR-Addict' className='underline'>
        MR-Addict
      </a>
    </footer>
  );
}
