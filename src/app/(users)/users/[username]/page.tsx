import { BottomNavigation } from "@/components/BottomNavigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { notFound } from "next/navigation";
import { PostedBeers } from "./_components/PostedBeers";
import { ProfileArea } from "./_components/ProfileArea";
import { fetchProfile } from "./_data/fetchProfile";
import { fetchUserBeerPosts } from "./_data/fetchUserBeerPosts";

type PageProps = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: PageProps) {
  const profile = await fetchProfile(params.username);

  if (!profile) {
    notFound();
  }

  const beerPosts = await fetchUserBeerPosts(profile.user_id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-8rem)] items-start">
        <Sidebar />
        <main className="flex-1 md:p-8 p-2">
          <ProfileArea profile={profile} />
          <PostedBeers beerPosts={beerPosts} />
        </main>
      </div>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
