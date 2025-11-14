import { Header } from "./_components/Header";
import { Sidebar } from "./_components/Sidebar";
import { Footer } from "./_components/Footer";

export default function Home() {
  const posts = [
    {
      title: "Weekend Tap Takeover",
      summary:
        "Local breweries unite for a collaborative tap list featuring experimental IPAs and crisp lagers.",
      author: "Hiroki",
      date: "2024/05/12",
    },
    {
      title: "Sour Flight Review",
      summary:
        "Tasting notes from the new kettle sour lineup with plenty of berry, citrus, and tropical vibes.",
      author: "Mariko",
      date: "2024/05/10",
    },
    {
      title: "Barrel-Aged Secrets",
      summary:
        "Behind the scenes at a small batch brewery aging stout in bourbon barrels for over a year.",
      author: "Ken",
      date: "2024/05/08",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 min-h-[calc(100vh-8rem)]">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-3xl space-y-6">
            {posts.map((post) => (
              <article
                key={post.title}
                className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white"
              >
                <header className="mb-4">
                  <p className="text-xs text-gray-500">
                    {post.date} · {post.author}
                  </p>
                  <h2 className="text-2xl font-semibold mt-1">{post.title}</h2>
                </header>
                <p className="text-gray-700 leading-relaxed">{post.summary}</p>
              </article>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
