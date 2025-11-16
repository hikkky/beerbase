// app/supabase-test/page.tsx
import { supabase } from "@/lib/supabase/supabaseClient";

export default async function SupabaseTestPage() {
  const { data, error } = await supabase.from("posts").select("*");

  return (
    <main style={{ padding: 24 }}>
      <h1>Supabase posts テスト</h1>

      <h2>error</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>

      <h2>data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
