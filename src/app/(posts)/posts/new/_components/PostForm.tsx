"use client";

import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useState,
} from "react";

const beerStyles = [
  "IPA",
  "Lager",
  "Pilsner",
  "Stout",
  "Sour",
  "Wheat",
  "その他",
];

type FormData = {
  title: string;
  location: string;
  style: string;
  tastingNotes: string;
  imageUrl: string;
  rating: string;
  tags: string;
};

const initialState: FormData = {
  title: "",
  location: "",
  style: beerStyles[0],
  tastingNotes: "",
  imageUrl: "",
  rating: "3",
  tags: "",
};

export function PostForm() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("success");
    setTimeout(() => setStatus("idle"), 2400);
  };

  const tagList = useMemo(
    () =>
      formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [formData.tags]
  );

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
            htmlFor="title"
            className="text-sm font-semibold text-gray-700"
          >
            タイトル
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="例: フルーティなNE IPAに感動"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="location"
              className="text-sm font-semibold text-gray-700"
            >
              店舗 / 体験場所
            </label>
            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
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
              id="style"
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {beerStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="tastingNotes"
            className="text-sm font-semibold text-gray-700"
          >
            テイスティングノート
          </label>
          <textarea
            id="tastingNotes"
            name="tastingNotes"
            value={formData.tastingNotes}
            onChange={handleChange}
            placeholder="香り・味わい・余韻など感じたことを自由に書いてください。"
            rows={6}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="imageUrl"
              className="text-sm font-semibold text-gray-700"
            >
              写真URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/beer.jpg"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="tags"
              className="text-sm font-semibold text-gray-700"
            >
              タグ (カンマ区切り)
            </label>
            <input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="#hazy,#citrus,#weekend"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="rating"
            className="text-sm font-semibold text-gray-700 flex items-center justify-between"
          >
            <span>満足度</span>
            <span className="text-amber-600 font-semibold">
              {Number(formData.rating).toFixed(1)}
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full accent-amber-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:opacity-80 transition"
          >
            投稿する
          </button>
          <button
            type="button"
            onClick={() => setFormData(initialState)}
            className="px-4 py-3 rounded-full border border-gray-300 text-sm font-medium hover:border-gray-400 transition"
          >
            リセット
          </button>
          {status === "success" && (
            <p className="text-sm text-green-600">下書きとして保存しました。</p>
          )}
        </div>
      </form>
        </section>
  );
}
