import Link from "next/link";

export function Header() {
  return (
    <header className="w-full h-16 flex items-center justify-between border-b border-gray-200 px-6 sticky top-0 bg-white/90 backdrop-blur z-10">
      <h1 className="text-2xl font-bold">BEERBASE</h1>
      <Link
        href="/posts/new"
        className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold transition flex items-center gap-2 hover:opacity-70"
      >
        <span className="text-lg leading-none">＋</span>
        Post
      </Link>
    </header>
  );
}
