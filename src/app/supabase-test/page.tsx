// app/supabase-test/page.tsx
import { supabase } from "@/lib/supabase/supabaseClient";
import { getPostImageUrl } from "@/utils/getImageUrl";

export default async function SupabaseTestPage() {
  const { data, error } = await supabase.from("posts").select("*");

  return (
    <main style={{ padding: 24 }}>
      <h1>Supabase posts テスト</h1>

      <h2>error</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>

      <h2>data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <h2>👇 実際の表示</h2>

      {data?.map((post) => {
        const imageUrl = getPostImageUrl(post.image_path);

        return (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              padding: 16,
              marginBottom: 16,
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>author: {post.author}</p>

            {imageUrl && (
              <img
                src={imageUrl}
                alt={post.title}
                style={{
                  marginTop: 12,
                  width: 200,
                  height: "auto",
                  borderRadius: 8,
                }}
              />
            )}
          </div>
        );
      })}
    </main>
  );
}
