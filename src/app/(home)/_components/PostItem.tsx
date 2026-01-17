import { getPostImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import { BeerPost } from "../_data/fetchBeerPosts";
import { RadarChart } from "./RadarChart";

interface Props {
  post: BeerPost;
}

export function PostItem({ post }: Props) {
  const imageUrl = getPostImageUrl(post.images[0]?.imageUrl || null);
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

  return (
    <article className="border border-gray-200 rounded-xl md:p-6 p-4 shadow-sm bg-white hover:shadow-md transition-shadow">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex">
            {/* TODO: avatarImage を表示 */}
            <p className="text-sm">
              {post.user.user_profiles[0]?.display_name}
            </p>
            <p className="text-sm text-gray-500">
              @{post.user.user_profiles[0]?.username}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              {post.createdAt.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="w-full flex gap-2">
          <div className="flex w-2/3 flex-col gap-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {post.beerName}
            </h2>

            <div className="flex flex-col gap-1">
              <div className="flex w-full gap-2">
                <dt className="w-1/2 shrink-0 bg-black px-2 py-0.5 text-xs font-semibold text-white">
                  Country
                </dt>
                <dd className="flex-1 text-sm text-gray-900">
                  {post.countryCode}
                </dd>
              </div>
              <div className="flex w-full gap-2">
                <dt className="w-1/2 shrink-0 bg-black px-2 py-0.5 text-xs font-semibold text-white">
                  Brewery
                </dt>
                <dd className="flex-1 text-sm text-gray-900">
                  {post.breweryName}
                </dd>
              </div>
              <div className="flex w-full gap-2">
                <dt className="w-1/2 shrink-0 bg-black px-2 py-0.5 text-xs font-semibold text-white">
                  Style
                </dt>
                <dd className="flex-1 text-sm text-gray-900">
                  {post.style?.name}
                </dd>
              </div>
              <div className="flex w-full gap-2">
                <dt className="w-1/2 shrink-0 bg-black px-2 py-0.5 text-xs font-semibold text-white">
                  ABV
                </dt>
                <dd className="flex-1 text-sm text-gray-900">
                  {post.abv?.toString()}%
                </dd>
              </div>
              <div className="flex w-full gap-2">
                <dt className="w-1/2 shrink-0 bg-black px-2 py-0.5 text-xs font-semibold text-white">
                  IBU
                </dt>
                <dd className="flex-1 text-sm text-gray-900">{post.ibu}</dd>
              </div>
            </div>
          </div>
          <div>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={post.beerName}
                width={200}
                height={100}
                className="w-1/3 h-auto rounded-lg object-cover"
              />
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="w-40 h-40">
              <RadarChart className="w-full h-full" scores={scores} />
            </div>
            <div className="flex-1 p-2 text-xs h-24 border border-dashed border-gray-300">
              {post.comment}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
