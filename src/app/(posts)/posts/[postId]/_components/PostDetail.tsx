import { RadarChart } from "@/app/(home)/_components/RadarChart";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import { BeerPost } from "../_data/fetchBeerPost";

interface Props {
  beerPost: BeerPost;
}

export function PostDetail({ beerPost }: Props) {
  const profile = beerPost.user.user_profiles[0];
  const imageUrl = getImageUrl(beerPost.images[0]?.imageUrl || null);
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
    bodyScore: toNumber(beerPost.bodyScore),
    sournessScore: toNumber(beerPost.sournessScore),
    sweetnessScore: toNumber(beerPost.sweetnessScore),
    aromaScore: toNumber(beerPost.aromaScore),
    bitternessScore: toNumber(beerPost.bitternessScore),
  };

  return (
    <article className="border border-gray-200 rounded-xl md:p-6 p-4 shadow-sm bg-white hover:shadow-md transition-shadow">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
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
            <div className="flex flex-wrap items-center gap-1">
              <p className="text-sm">
                {profile?.display_name ?? profile?.username}
              </p>
              <p className="text-sm text-gray-500">@{profile?.username}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              {beerPost.createdAt.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </div>
        </div>

        <h2 className="px-1 text-xl font-semibold text-gray-900 border-b border-gray-300 pb-0.5">
          {beerPost.beerName}
        </h2>
        <div className="w-full items-center flex gap-2">
          <div className="flex w-1/2 flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex w-full gap-2">
                <dt className="w-16 shrink-0 bg-black px-1 py-0.5 text-xs font-semibold text-white">
                  Country
                </dt>
                <dd className="flex-1 text-sm text-gray-900">
                  {beerPost.countryCode}
                </dd>
              </div>
              <div className="flex w-full gap-2">
                <dt className="w-16 shrink-0 bg-black px-1 py-0.5 text-xs font-semibold text-white">
                  Brewery
                </dt>
                <dd className="flex-1 text-sm text-gray-900">
                  {beerPost.breweryName}
                </dd>
              </div>
              <div className="flex w-full gap-2">
                <dt className="w-16 shrink-0 bg-black px-1 py-0.5 text-xs font-semibold text-white">
                  Style
                </dt>
                <dd className="flex-1 text-sm text-gray-900">
                  {beerPost.style?.name}
                </dd>
              </div>
              <div className="flex w-full gap-2">
                <dt className="w-16 shrink-0 bg-black px-1 py-0.5 text-xs font-semibold text-white">
                  ABV
                </dt>
                <dd className="flex-1 text-sm text-gray-900">
                  {beerPost.abv?.toString()}%
                </dd>
              </div>
              <div className="flex w-full gap-2">
                <dt className="w-16 shrink-0 bg-black px-1 py-0.5 text-xs font-semibold text-white">
                  IBU
                </dt>
                <dd className="flex-1 text-sm text-gray-900">{beerPost.ibu}</dd>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            {imageUrl && (
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={imageUrl}
                  alt={beerPost.beerName}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-32">
              <RadarChart className="w-full h-full" scores={scores} />
            </div>
            <div className="flex-1 p-2 text-xs h-24 border border-dashed border-gray-300">
              {beerPost.comment}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
