"use client";

import { supabase } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SetupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const { data: userResult, error: userError } =
      await supabase.auth.getUser();
    const user = userResult?.user;

    if (userError || !user) {
      setIsLoading(false);
      setError(
        "ログイン状態を確認できませんでした。ログインし直してください。"
      );
      return;
    }

    const { error: profileError } = await supabase
      .from("user_profiles")
      .upsert({
        user_id: user.id,
        username,
        display_name: displayName || null,
        bio: bio || null,
      });

    setIsLoading(false);

    if (profileError) {
      setError(profileError.message);
      return;
    }

    setMessage("プロフィールを登録しました。");
    router.push("/");
  };

  return (
    <div className="bg-white/80 backdrop-blur border border-amber-100 shadow-lg rounded-2xl p-8 space-y-8">
      <header className="text-center space-y-2">
        <p className="text-sm font-medium text-amber-700">Setup</p>
        <h1 className="text-3xl font-bold text-gray-900">プロフィール設定</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="username"
            className="text-sm font-semibold text-gray-700"
          >
            ユーザー名
          </label>
          <p className="text-xs text-gray-700">
            英数字・アンダースコアで入力してください（例: beer_lover）
          </p>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="display_name"
            className="text-sm font-semibold text-gray-700"
          >
            表示名
          </label>
          <input
            id="display_name"
            name="display_name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="name"
            placeholder="ビール好きヒロキ"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="bio" className="text-sm font-semibold text-gray-700">
            自己紹介
          </label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="好きなスタイルやよく行くブルワリーなどを書いてみましょう"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {isLoading ? "保存中..." : "プロフィールを保存"}
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      {message && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
          {message}
        </p>
      )}
    </div>
  );
}
