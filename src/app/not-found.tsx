import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto w-full h-dvh flex flex-col justify-center items-center gap-4">
      <h2 className="text-5xl text-rose-900">Page Not Found</h2>
      <p className="text-xl italic">Could not find requested resource</p>
      <Link
        href="/"
        className="text-2xl text-amber-400 cursor-pointer hover:text-yellow-200 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
