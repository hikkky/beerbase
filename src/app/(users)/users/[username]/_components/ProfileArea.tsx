"use client";

import { PencilIcon } from "@/components/icons";
import { supabase } from "@/lib/supabase/supabaseClient";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Profile } from "../_data/fetchProfile";

interface Props {
  profile: Profile;
}

export function ProfileArea({ profile }: Props) {
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const avatarUrl = profile.avatar_url ? getImageUrl(profile.avatar_url) : null;
  const fallbackInitial = (profile.display_name ?? profile.username)
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const checkOwnProfile = async () => {
      const { data: userResult } = await supabase.auth.getUser();
      const currentUserId = userResult?.user?.id;
      if (currentUserId === profile.user_id) {
        setIsOwnProfile(true);
      }
    };

    checkOwnProfile();
  }, [profile.user_id]);

  return (
    <div className="max-w-4xl md:mx-auto space-y-8">
      <section className="p-4 md:p-8 flex flex-col gap-4 md:flex-row md:items-center md:gap-8 md:rounded-xl md:border md:border-gray-200 md:bg-white md:shadow-sm">
        <div className="flex items-center justify-between md:shrink-0">
          <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center text-2xl md:text-3xl font-bold text-white">
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
          {isOwnProfile && (
            <Link
              href={`/users/${profile.username}/edit`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <PencilIcon className="h-4 w-4" />
              <span>編集</span>
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-2 md:gap-3 flex-1">
          <div className="flex flex-wrap items-center gap-1">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">
              {profile.display_name ?? profile.username}
            </h1>
            <span className="text-gray-700 md:text-lg">
              @{profile.username}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            {profile.bio || "自己紹介はまだありません。"}
          </p>
        </div>
      </section>
    </div>
  );
}
