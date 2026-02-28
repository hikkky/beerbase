"use client";

import { supabase } from "@/lib/supabase/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    // プロフィールの存在をチェック
    try {
      const { data: userResult } = await supabase.auth.getUser();
      const userId = userResult?.user?.id;

      if (userId) {
        const response = await fetch("/api/me/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          const profile = (await response.json()) as { username: string | null };
          if (!profile.username) {
            // プロフィールが存在しない場合はセットアップページへ
            setMessage("ログインしました。プロフィールを設定してください。");
            router.push("/setup");
            return;
          }
        }
      }
    } catch (error) {
      // プロフィールチェックに失敗した場合はデフォルトでホームへ
      console.error("プロフィールチェックエラー:", error);
    }

    setMessage("ログインしました。");
    router.push("/");
  };

  return (
    <div className="bg-white/80 backdrop-blur border border-amber-100 shadow-lg rounded-2xl p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">ログイン</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-700"
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-1.5">
          <div>
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700"
            >
              パスワード
            </label>
            <p className="text-xs text-gray-700">
              英数字6文字以上で入力してください
            </p>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {isLoading ? "ログイン中..." : "ログイン"}
        </button>
        <div className="text-center">
          <Link
            href="/signup"
            className="text-sm font-semibold text-gray-700 hover:text-gray-900 underline underline-offset-4"
          >
            アカウント作成はこちら
          </Link>
        </div>
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
