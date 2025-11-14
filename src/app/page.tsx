import { Header } from "./_components/Header";
import { Sidebar } from "./_components/Sidebar";
import { Footer } from "./_components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 min-h-[calc(100vh-8rem)]">
        <Sidebar />
        <main className="flex-1 p-8">
          <section className="max-w-3xl space-y-4">
            <h2 className="text-xl font-semibold">
              Craft, Connect, Celebrate.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Discover new breweries, track your favorite pours, and connect
              with fellow beer lovers. This is your basecamp for everything
              craft beer.
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
