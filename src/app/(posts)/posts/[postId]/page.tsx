import { BottomNavigation } from "@/components/BottomNavigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { BackLink } from "./_components/BackLink";
import { PostDetail } from "./_components/PostDetail";
import { fetchBeerPost } from "./_data/fetchBeerPost";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const beerPost = await fetchBeerPost(Number(postId));
  if (!beerPost) {
    return <div>Post not found</div>; // TODO: notFoundページへリダイレクト
  }

  return (
    <div className="min-h-screen flex flex-col md:bg-gray-50">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-8rem)] items-start">
        <Sidebar />
        <main className="flex-1 md:p-10 p-2">
          <div className="mb-1 md:mx-auto md:max-w-5xl">
            <BackLink />
          </div>
          <PostDetail beerPost={beerPost} />
        </main>
      </div>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
