import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";
import { BeerPost } from "../_data/fetchUserBeerPosts";

type Props = {
  beerPosts: BeerPost[];
};

export function PostedBeers({ beerPosts }: Props) {
  return (
    <section className="grid grid-cols-3">
      {beerPosts.map((beerPost) => {
        const imageUrl = getImageUrl(beerPost.images[0]?.imageUrl || null); // TODO: 画像がない場合の処理
        if (!imageUrl) return null;

        return (
          <article
            key={beerPost.id.toString()}
            className="relative w-full overflow-hidden"
          >
            <div className="relative w-full aspect-square">
              <Image
                src={imageUrl}
                alt={beerPost.beerName}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </article>
        );
      })}
    </section>
  );
}
