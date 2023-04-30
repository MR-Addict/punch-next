import Link from "next/link";

export default function NotFound() {
  return (
    <main aria-label='404 notfound page' className='flex-1 flex flex-row items-center justify-center gap-1.5'>
      <h1>404 Not found!</h1>
      <Link href='/archive' className='underline'>
        Go back
      </Link>
    </main>
  );
}
