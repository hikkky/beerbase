import { BeerPost } from "../_data/fetchBeerPosts";
import { PostItem } from "./PostItem";

interface Props {
  beerPosts: BeerPost[];
}

export function PostList({ beerPosts }: Props) {
  return (
    <div className="w-full md:max-w-5xl md:mx-auto md:space-y-8 space-y-4">
      {beerPosts.map((beerPost) => (
        <PostItem key={beerPost.id.toString()} post={beerPost} />
      ))}
    </div>
  );
}
