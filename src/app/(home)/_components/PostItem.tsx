import { Post } from "./posts";

interface Props {
  post: Post;
}

export function PostItem({ post }: Props) {
  return (
    <article
      key={post.title}
      className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white"
    >
      <header className="mb-4 flex items-center gap-4">
        <span className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex flex-col text-xs text-gray-500 space-y-1">
          <p>{post.author}</p>
          <p> {post.date}</p>
        </div>
      </header>
      <h2 className="text-2xl font-semibold mt-1">{post.title}</h2>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>
    </article>
  );
}
