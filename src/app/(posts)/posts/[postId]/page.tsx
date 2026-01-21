import { BottomNavigation } from "@/components/BottomNavigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { PostDetail } from "./_components/PostDetail";
import { fetchBeerPost } from "./_data/fetchBeerPost";

export default async function PostDetailPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const beerPost = await fetchBeerPost(Number(postId));
  if (!beerPost) {
    return <div>Post not found</div>; // TODO: notFoundページへリダイレクト
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-8rem)] items-start">
        <Sidebar />
        <main className="flex-1 md:p-8 p-2">
          <PostDetail beerPost={beerPost} />
        </main>
      </div>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
