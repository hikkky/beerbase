import Image from "next/image";
import { getPostImageUrl } from "@/utils/getImageUrl";
import { BeerPost } from "../_data/fetchBeerPosts";

interface Props {
  post: BeerPost;
}

export function PostItem({ post }: Props) {
  const imageUrl = getPostImageUrl(post.images[0]?.imageUrl || null);

  return (
    <article className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition-shadow">
      <header className="mb-5 flex items-center gap-4">
        <span className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex flex-col text-sm text-gray-500">
          <p className="font-medium text-gray-700">{post.user.id}</p>
          <p>{post.createdAt.toLocaleDateString()}</p>
        </div>
      </header>
      <div className="mb-5 space-y-3">
        <h2 className="text-xl font-semibold text-gray-900">{post.beerName}</h2>
        <p className="text-gray-700 leading-relaxed">{post.comment}</p>
      </div>
      {imageUrl && (
        <div className="rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.beerName}
            width={1200}
            height={675}
            className="w-full h-56 object-contain"
          />
        </div>
      )}
    </article>
  );
}
