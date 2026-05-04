import { DeletePostButton } from "@/components/DeletePostButton";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import { BeerPost } from "../_data/fetchBeerPosts";
import { RadarChart } from "./RadarChart";

interface Props {
  post: BeerPost;
}

export function PostItem({ post }: Props) {
  const profile = post.user.user_profiles[0];
  const imageUrl = getImageUrl(post.images[0]?.imageUrl || null);
  const avatarUrl = profile?.avatar_url
    ? getImageUrl(profile.avatar_url)
    : null;
  const fallbackInitial = (profile?.display_name ?? profile?.username ?? "U")
    .slice(0, 2)
    .toUpperCase();
  const toNumber = (value: number | { toNumber: () => number } | null) => {
    if (value == null) return 0;
    if (typeof value === "number") return value;
    return value.toNumber();
  };

  const scores = {
    bodyScore: toNumber(post.bodyScore),
    sournessScore: toNumber(post.sournessScore),
    sweetnessScore: toNumber(post.sweetnessScore),
    aromaScore: toNumber(post.aromaScore),
    bitternessScore: toNumber(post.bitternessScore),
  };

  const profileHref = profile?.username ? `/users/${profile.username}` : null;

  return (
    <article className="border border-gray-200 rounded-xl md:p-8 p-4 shadow-sm bg-white hover:shadow-md transition-shadow">
      <div className="w-full flex flex-col gap-2 md:gap-5">
        <div className="flex justify-between md:items-center">
          {profileHref ? (
            <Link
              href={profileHref}
              className="flex items-center gap-2"
              aria-label={`${profile?.display_name ?? profile?.username}のプロフィールへ`}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center text-xs font-semibold text-white">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={`${profile?.username ?? "user"}のアバター`}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                ) : (
                  <span>{fallbackInitial}</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1 md:gap-2">
                <p className="text-sm md:text-base">
                  {profile?.display_name ?? profile?.username}
                </p>
                <p className="text-sm text-gray-500">@{profile?.username}</p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center text-xs font-semibold text-white">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={`${profile?.username ?? "user"}のアバター`}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                ) : (
                  <span>{fallbackInitial}</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1 md:gap-2">
                <p className="text-sm md:text-base">
                  {profile?.display_name ?? profile?.username}
                </p>
                <p className="text-sm text-gray-500">@{profile?.username}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">
              {post.createdAt.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
            <DeletePostButton
              postId={Number(post.id)}
              authorUserId={post.user.id}
            />
          </div>
        </div>

        <Link
          href={`/posts/${post.id.toString()}`}
          className="block"
          aria-label={`${post.beerName}の投稿詳細へ`}
        >
          <h2 className="px-1 text-xl md:text-2xl font-semibold text-gray-900 border-b border-gray-300 pb-0.5 md:pb-2">
            {post.beerName}
          </h2>
          <div className="w-full items-center flex gap-2 md:gap-8">
            <div className="flex w-1/2 flex-col gap-2 md:gap-4">
              <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex w-full gap-2">
                  <dt className="w-16 md:w-24 shrink-0 bg-black px-1 md:px-3 py-0.5 md:py-1 text-xs font-semibold text-white">
                    Country
                  </dt>
                  <dd className="flex-1 text-sm md:text-base text-gray-900">
                    {post.countryCode}
                  </dd>
                </div>
                <div className="flex w-full gap-2">
                  <dt className="w-16 md:w-24 shrink-0 bg-black px-1 md:px-3 py-0.5 md:py-1 text-xs font-semibold text-white">
                    Brewery
                  </dt>
                  <dd className="flex-1 text-sm md:text-base text-gray-900">
                    {post.breweryName}
                  </dd>
                </div>
                <div className="flex w-full gap-2">
                  <dt className="w-16 md:w-24 shrink-0 bg-black px-1 md:px-3 py-0.5 md:py-1 text-xs font-semibold text-white">
                    Style
                  </dt>
                  <dd className="flex-1 text-sm md:text-base text-gray-900">
                    {post.style?.name}
                  </dd>
                </div>
                <div className="flex w-full gap-2">
                  <dt className="w-16 md:w-24 shrink-0 bg-black px-1 md:px-3 py-0.5 md:py-1 text-xs font-semibold text-white">
                    ABV
                  </dt>
                  <dd className="flex-1 text-sm md:text-base text-gray-900">
                    {post.abv?.toString()}%
                  </dd>
                </div>
                <div className="flex w-full gap-2">
                  <dt className="w-16 md:w-24 shrink-0 bg-black px-1 md:px-3 py-0.5 md:py-1 text-xs font-semibold text-white">
                    IBU
                  </dt>
                  <dd className="flex-1 text-sm md:text-base text-gray-900">
                    {post.ibu}
                  </dd>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              {imageUrl && (
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={imageUrl}
                    alt={post.beerName}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 md:gap-6">
              <div className="w-32 h-32 md:w-44 md:h-44">
                <RadarChart className="w-full h-full" scores={scores} />
              </div>
              <div className="flex-1 p-2 md:p-4 text-xs md:text-sm h-24 md:h-36 border border-dashed border-gray-300">
                {post.comment}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}
