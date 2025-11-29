"use client";

import { BeerStyles } from "@/components/fetchBeerStyles";

interface Props {
  beerStyles: BeerStyles;
}

export function PostForm({ beerStyles }: Props) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <form className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
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
            htmlFor="title"
            className="text-sm font-semibold text-gray-700"
          >
            ビール名
          </label>
          <input
            name="beerName"
            placeholder="よなよあエール"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="location"
              className="text-sm font-semibold text-gray-700"
            >
              ブルワリー
            </label>
            <input
              name="breweryName"
              placeholder="例: Yokohama Hop Stand"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="style"
              className="text-sm font-semibold text-gray-700"
            >
              スタイル
            </label>
            <select
              name="beerStyle"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {beerStyles.map((style) => (
                <option key={style.id} value={style.name}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:opacity-80 transition"
          >
            投稿する
          </button>
          {status === "success" && (
            <p className="text-sm text-green-600">下書きとして保存しました。</p>
          )}
        </div>
      </form>
    </section>
  );
}
