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
        <main className="flex-1 p-8 space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-amber-700 uppercase tracking-[0.2em]">
              Post
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              新しいビール投稿を作成
            </h1>
            <p className="text-gray-500">
              ビールの味はもちろん、気温や気分、その瞬間のひとことでもOK。
              思い立ったら気軽に一杯の記録を残しましょう
            </p>
          </div>
          <PostForm beerStyles={beerStyles} />
        </main>
      </div>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
