// src/utils/getImageUrl.ts
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export function getPostImageUrl(path: string | null): string | null {
  if (!path) return null;
  return `${supabaseUrl}/storage/v1/object/public/images/${path}`;
}
