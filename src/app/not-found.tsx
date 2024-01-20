import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 w-full flex items-center justify-center">
      <p>
        <span className="text-2xl">404</span>
        <span> Not Found | Go back to </span>
        <Link href="/" className="text-blue-600">
          home
        </Link>
      </p>
    </main>
  );
}
