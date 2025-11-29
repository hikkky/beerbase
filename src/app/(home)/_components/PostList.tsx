import { PostItem } from "./PostItem";
import { BeerPost } from "../_data/fetchBeerPosts";

interface Props {
  beerPosts: BeerPost[];
}

export function PostList({ beerPosts }: Props) {
  return (
    <div className="max-w-3xl space-y-6">
      {beerPosts.map((beerPost) => (
        <PostItem key={beerPost.beerName} post={beerPost} />
      ))}
    </div>
  );
}
