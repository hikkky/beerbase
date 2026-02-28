"use client";

import { supabase } from "@/lib/supabase/supabaseClient";
import { useEffect, useState } from "react";

type ProfileResponse = {
  username: string | null;
};

export function useMyPageHref() {
  const [myPageHref, setMyPageHref] = useState("/signup");

  useEffect(() => {
    let isMounted = true;

    const loadUsername = async () => {
      try {
        const { data: userResult, error: userError } =
          await supabase.auth.getUser();

        const userId = userResult?.user?.id;
        if (userError || !userId) {
          // 未ログイン時は /signup を設定
          if (isMounted) {
            setMyPageHref("/signup");
          }
          return;
        }

        const response = await fetch("/api/me/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          // プロフィール取得失敗時も /signup を設定
          if (isMounted) {
            setMyPageHref("/signup");
          }
          return;
        }

        const profile = (await response.json()) as ProfileResponse;

        if (profile.username && isMounted) {
          setMyPageHref(`/users/${profile.username}`);
        } else if (isMounted) {
          // username が存在しない場合も /signup を設定
          setMyPageHref("/signup");
        }
      } catch (error) {
        console.error(error);
        // エラー時も /signup を設定
        if (isMounted) {
          setMyPageHref("/signup");
        }
      }
    };

    loadUsername();

    return () => {
      isMounted = false;
    };
  }, []);

  return myPageHref;
}
