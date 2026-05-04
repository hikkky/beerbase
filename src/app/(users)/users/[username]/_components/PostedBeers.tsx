import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import Link from "next/link";
import { BeerPost } from "../_data/fetchUserBeerPosts";

type Props = {
  beerPosts: BeerPost[];
};

export function PostedBeers({ beerPosts }: Props) {
  return (
    <section className="grid grid-cols-3 md:grid-cols-4 md:gap-3 md:max-w-4xl md:mx-auto md:mt-6">
      {beerPosts.map((beerPost) => {
        const imageUrl = getImageUrl(beerPost.images[0]?.imageUrl || null); // TODO: 画像がない場合の処理
        if (!imageUrl) return null;

        return (
          <Link
            href={`/posts/${beerPost.id.toString()}`}
            key={beerPost.id.toString()}
            className="relative w-full overflow-hidden md:rounded-lg md:bg-white md:shadow-sm md:transition md:hover:-translate-y-0.5 md:hover:shadow-md"
          >
            <div className="relative w-full aspect-square">
              <Image
                src={imageUrl}
                alt={beerPost.beerName}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 20vw, 33vw"
              />
            </div>
          </Link>
        );
      })}
    </section>
  );
}
