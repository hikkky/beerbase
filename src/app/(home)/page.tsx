import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Footer } from "../../components/Footer";
import { PostList } from "./_components/PostList";
import { supabase } from "@/lib/supabase/supabaseClient";

export type Post = {
  title: string;
  content: string;
  author: string;
  created_at: string;
  image_path: string;
};

export default async function Home() {
  const { data, error } = await supabase.from("posts").select("*");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-8rem)] items-start">
        <Sidebar />
        <main className="flex-1 p-8">
          <PostList posts={data ?? []} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
