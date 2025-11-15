import { Header } from "../_components/Header";
import { Sidebar } from "../_components/Sidebar";
import { Footer } from "../_components/Footer";
import { posts } from "./_components/posts";
import { PostList } from "./_components/PostList";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-8rem)]">
        <Sidebar />
        <main className="flex-1 p-8">
          <PostList />
        </main>
      </div>
      <Footer />
    </div>
  );
}
