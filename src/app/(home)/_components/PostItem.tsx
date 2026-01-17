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
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex">
                <p className="text-sm text-gray-500">
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
            <h2 className="text-xl font-semibold text-gray-900">
              {post.beerName}
            </h2>

            <p>{post.countryCode}</p>
            <p>{post.breweryName}</p>
            <p>{post.style?.name}</p>
            <p>{post.abv?.toString()}%</p>
            <p>{post.ibu}</p>
          </div>
          <div>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={post.beerName}
                width={1200}
                height={675}
                className="h-56 object-contain"
              />
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-6">
            <div className="w-40 h-40">
              <RadarChart className="w-full h-full" scores={scores} />
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{post.comment}</p>
        </div>
      </div>
    </article>
  );
}
