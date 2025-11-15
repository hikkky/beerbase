import { PostItem } from "./PostItem";
import { posts } from "./posts";

export function PostList() {
  return (
    <div className="max-w-3xl space-y-6">
      {posts.map((post) => (
        <PostItem key={post.title} post={post} />
      ))}
    </div>
  );
}
