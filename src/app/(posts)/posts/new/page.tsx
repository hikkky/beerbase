import { BottomNavigation } from "@/components/BottomNavigation";
import { fetchBeerStyles } from "@/components/fetchBeerStyles";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { PostForm } from "./_components/PostForm";

export default async function PostPage() {
  const beerStyles = await fetchBeerStyles();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-8rem)] items-start">
        <Sidebar />
        <main className="flex-1 md:p-8 p-2">
          <PostForm beerStyles={beerStyles} />
        </main>
      </div>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
