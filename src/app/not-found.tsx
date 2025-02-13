import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 w-full flex items-center justify-center">
      <p className="text-gray-800">
        <span className="text-2xl font-bold text-black">404 | </span>
        <span>Go back to </span>
        <Link href="/" className="text-blue-600">
          home.
        </Link>
      </p>
    </main>
  );
}
