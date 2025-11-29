import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Footer } from "../../components/Footer";
import { PostList } from "./_components/PostList";
import { fetchBeerPosts } from "./_data/fetchBeerPosts";

export default async function Home() {
  const beerPosts = await fetchBeerPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-8rem)] items-start">
        <Sidebar />
        <main className="flex-1 p-8">
          <PostList beerPosts={beerPosts} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
