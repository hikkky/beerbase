"use client";

import { useRouter } from "next/navigation";

export function BackLink() {
  const router = useRouter();

  return (
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault();
        router.back();
      }}
      className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition"
    >
      ← 戻る
    </a>
  );
}
