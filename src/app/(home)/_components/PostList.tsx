import { Post } from "../page";
import { PostItem } from "./PostItem";

interface Props {
  posts: Post[];
}

export function PostList({ posts }: Props) {
  return (
    <div className="max-w-3xl space-y-6">
      {posts.map((post) => (
        <PostItem key={post.title} post={post} />
      ))}
    </div>
  );
}
