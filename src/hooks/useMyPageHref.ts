"use client";

import { supabase } from "@/lib/supabase/supabaseClient";
import { useEffect, useState } from "react";

type ProfileResponse = {
  username: string | null;
};

export function useMyPageHref() {
  const [myPageHref, setMyPageHref] = useState("#");

  useEffect(() => {
    let isMounted = true;

    const loadUsername = async () => {
      try {
        const { data: userResult, error: userError } =
          await supabase.auth.getUser();

        const userId = userResult?.user?.id;
        if (userError || !userId) {
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
          return;
        }

        const profile = (await response.json()) as ProfileResponse;

        if (profile.username && isMounted) {
          setMyPageHref(`/users/${profile.username}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadUsername();

    return () => {
      isMounted = false;
    };
  }, []);

  return myPageHref;
}
