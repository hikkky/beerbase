"use client";

import { BeerStyles } from "@/components/fetchBeerStyles";
import { createPost } from "./_action/createPost";
import { useState } from "react";

interface Props {
  beerStyles: BeerStyles;
}

export function PostForm({ beerStyles }: Props) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const countryCodes = [
    { code: "JP", name: "Japan" },
    { code: "US", name: "United States" },
    { code: "DE", name: "Germany" },
    { code: "BE", name: "Belgium" },
    { code: "NL", name: "Netherlands" },
    { code: "GB", name: "United Kingdom" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "CA", name: "Canada" },
    // 他の国コードも必要に応じて追加
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await createPost(formData);
    setIsPending(false);
    if (result.success) {
      // 投稿成功時の処理（例: リダイレクトやメッセージ表示）
      console.log("Post created with ID:", result.postId);
    } else {
      // エラーハンドリング
      console.error("Failed to create post");
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6"
      >
        <header className="space-y-1">
          <p className="text-sm font-medium text-amber-700">New Post</p>
          <h2 className="text-2xl font-semibold text-gray-900">
            今日のビール体験をシェア
          </h2>
          <p className="text-sm text-gray-500">
            どんな場所で、どんな味わいだったかを記録してみましょう。
          </p>
        </header>

        <div className="space-y-1.5">
          <label
            htmlFor="beerName"
            className="text-sm font-semibold text-gray-700"
          >
            ビール名
          </label>
          <input
            id="beerName"
            name="beerName"
            placeholder="よなよあエール"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="countryCode"
              className="text-sm font-semibold text-gray-700"
            >
              生産地
            </label>
            <select
              id="countryCode"
              name="countryCode"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="breweryName"
              className="text-sm font-semibold text-gray-700"
            >
              ブルワリー
            </label>
            <input
              id="breweryName"
              name="breweryName"
              placeholder="例: Yokohama Hop Stand"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="beerStyle"
              className="text-sm font-semibold text-gray-700"
            >
              スタイル
            </label>
            <select
              id="beerStyle"
              name="beerStyle"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {beerStyles.map((style) => (
                <option key={style.id} value={style.id.toString()}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="abv"
              className="text-sm font-semibold text-gray-700"
            >
              ABV(%)
            </label>
            <input
              id="abv"
              name="abv"
              placeholder="例: 5.0"
              type="number"
              step="0.1"
              min="0"
              max="100"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="ibu"
              className="text-sm font-semibold text-gray-700"
            >
              IBU
            </label>
            <input
              id="ibu"
              name="ibu"
              placeholder="例: 20"
              type="number"
              min="0"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="comment"
              className="text-sm font-semibold text-gray-700"
            >
              メモ・感想
            </label>
            <textarea
              id="comment"
              name="comment"
              placeholder="最高"
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:opacity-80 transition"
          >
            投稿する
          </button>
        </div>
      </form>
    </section>
  );
}
