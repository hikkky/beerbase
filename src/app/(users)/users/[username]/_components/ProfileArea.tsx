import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import { Profile } from "../_data/fetchProfile";

interface Props {
  profile: Profile;
}

export function ProfileArea({ profile }: Props) {
  const avatarUrl = profile.avatar_url ? getImageUrl(profile.avatar_url) : null;
  const fallbackInitial = (profile.display_name ?? profile.username)
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-4xl space-y-8">
      <section className="p-4 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center text-2xl font-bold text-white">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`${profile.username}のアバター`}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <span>{fallbackInitial}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex flex-wrap items-center gap-1">
            <h1 className="text-xl font-bold text-gray-900">
              {profile.display_name ?? profile.username}
            </h1>
            <span className="text-gray-700">@{profile.username}</span>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            {profile.bio || "自己紹介はまだありません。"}
          </p>
        </div>
      </section>
    </div>
  );
}
