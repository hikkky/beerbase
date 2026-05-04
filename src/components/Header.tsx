"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useEffect, useState } from "react";

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data.user);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="w-full h-16 flex items-center justify-between border-b border-gray-200 px-6 md:px-10 sticky top-0 bg-white/90 backdrop-blur z-10">
      <h1 className="text-2xl font-bold md:text-3xl">
        <Link href="/">BEERBASE</Link>
      </h1>
      <div className="flex items-center gap-3">
        {isAuthenticated === null ? (
          // ローディング中は何も表示しない
          <div className="w-24" />
        ) : isAuthenticated ? (
          // ログイン済み: Postボタンを表示
          <Link
            href="/posts/new"
            className="px-4 py-2 md:px-5 rounded-full bg-black text-white text-sm font-semibold transition flex items-center gap-2 hover:opacity-70"
          >
            <span className="text-lg leading-none">＋</span>
            Post
          </Link>
        ) : (
          // 未ログイン: 会員登録とログインボタンを表示
          <>
            <Link
              href="/signup"
              className="px-4 py-2 md:px-5 rounded-full border border-gray-300 text-gray-700 text-sm font-semibold transition hover:bg-gray-50"
            >
              会員登録
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 md:px-5 rounded-full bg-black text-white text-sm font-semibold transition hover:opacity-70"
            >
              ログイン
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
