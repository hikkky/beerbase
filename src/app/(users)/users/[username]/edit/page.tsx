import { BottomNavigation } from "@/components/BottomNavigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { notFound } from "next/navigation";
import { EditProfileForm } from "./_components/EditProfileForm";
import { fetchProfile } from "../_data/fetchProfile";

type PageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function EditProfilePage({ params }: PageProps) {
  const { username } = await params;
  const profile = await fetchProfile(username);

  if (!profile) {
    notFound();
  }

  // 認証チェックはServer Action内で行う

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-8rem)] items-start">
        <Sidebar />
        <main className="flex-1 md:p-8 p-2">
          <EditProfileForm profile={profile} />
        </main>
      </div>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
