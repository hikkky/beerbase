import { BottomNavigation } from "@/components/BottomNavigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { notFound } from "next/navigation";
import { ProfileArea } from "./_components/ProfileArea";
import { fetchProfile } from "./_data/fetchProfile";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-8rem)] items-start">
        <Sidebar />
        <main className="flex-1 p-8">
          <ProfileArea profile={profile} />
        </main>
      </div>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
