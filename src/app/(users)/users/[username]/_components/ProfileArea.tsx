import { getPostImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import { Profile } from "../_data/fetchProfile";

interface Props {
  profile: Profile;
}

export function ProfileArea({ profile }: Props) {
  const avatarUrl = profile.avatar_url
    ? getPostImageUrl(profile.avatar_url)
    : null;
  const fallbackInitial = (profile.display_name ?? profile.username)
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-4xl space-y-8">
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 flex flex-col gap-6 md:flex-row md:items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center text-2xl font-bold text-white">
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
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">
              {profile.display_name ?? profile.username}
            </h1>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
              @{profile.username}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {profile.bio || "自己紹介はまだありません。"}
          </p>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-4">
        <header className="space-y-1">
          <p className="text-sm font-semibold text-amber-700 uppercase tracking-[0.18em]">
            Profile
          </p>
          <h2 className="text-2xl font-bold text-gray-900">プロフィール詳細</h2>
        </header>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <dt className="text-sm text-gray-500">ユーザーID</dt>
          </div>
          <div className="space-y-1">
            <dt className="text-sm text-gray-500">レコードID</dt>
          </div>
          <div className="space-y-1">
            <dt className="text-sm text-gray-500">表示名</dt>
            <dd className="font-medium text-gray-900">
              {profile.display_name ?? "未設定"}
            </dd>
          </div>
          <div className="space-y-1">
            <dt className="text-sm text-gray-500">アバターURL</dt>
            <dd className="font-medium text-gray-900">
              {profile.avatar_url ?? "未設定"}
            </dd>
          </div>
          <div className="space-y-1">
            <dt className="text-sm text-gray-500">自己紹介</dt>
            <dd className="font-medium text-gray-900 whitespace-pre-line">
              {profile.bio || "未設定"}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
