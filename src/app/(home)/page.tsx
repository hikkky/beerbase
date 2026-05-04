import { BottomNavigation } from "@/components/BottomNavigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { PostList } from "./_components/PostList";
import { fetchBeerPosts } from "./_data/fetchBeerPosts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const beerPosts = await fetchBeerPosts();

  return (
    <div className="min-h-screen flex flex-col md:bg-gray-50">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-8rem)] items-start">
        <Sidebar />
        <main className="flex-1 md:p-10 p-2">
          <PostList beerPosts={beerPosts} />
        </main>
      </div>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
