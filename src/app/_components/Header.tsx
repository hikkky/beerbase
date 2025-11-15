export function Header() {
  return (
    <header className="w-full h-16 flex items-center justify-between border-b border-gray-200 px-6">
      <h1 className="text-2xl font-bold">BEERBASE</h1>
      <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold transition flex items-center gap-2 hover:opacity-70">
        <span className="text-lg leading-none">＋</span>
        Post
      </button>
    </header>
  );
}
