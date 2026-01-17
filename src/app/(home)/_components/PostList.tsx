import { BeerPost } from "../_data/fetchBeerPosts";
import { PostItem } from "./PostItem";

interface Props {
  beerPosts: BeerPost[];
}

export function PostList({ beerPosts }: Props) {
  return (
    <div className="w-full md:max-w-3xl md:space-y-6 space-y-4">
      {beerPosts.map((beerPost) => (
        <PostItem key={beerPost.id.toString()} post={beerPost} />
      ))}
    </div>
  );
}
