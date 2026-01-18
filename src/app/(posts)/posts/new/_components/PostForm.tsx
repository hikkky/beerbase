"use client";

import { BeerStyles } from "@/components/fetchBeerStyles";
import { PhotoIcon } from "@/components/icons";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useEffect, useRef, useState } from "react";
import { createPost } from "./actions/createPost";
import { PreviewImage } from "./PreviewImage";
import { ScoreSlider } from "./ScoresSlider";

interface Props {
  beerStyles: BeerStyles;
}

export type ScoreKey =
  | "bodyScore"
  | "sournessScore"
  | "sweetnessScore"
  | "aromaScore"
  | "bitternessScore";

type Scores = Record<ScoreKey, string>;

export function PostForm({ beerStyles }: Props) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scores, setScores] = useState<Scores>({
    bodyScore: "3.0",
    sournessScore: "3.0",
    sweetnessScore: "3.0",
    aromaScore: "3.0",
    bitternessScore: "3.0",
  });

  const imageInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const labelClassName = previewUrl
    ? "group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200"
    : "group flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-200 px-6 py-10 transition-colors hover:border-amber-400 hover:bg-amber-50/40";

  const handleScoreChange = (key: ScoreKey, value: string) => {
    setScores((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessages([]);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);
    const { data, error: userError } = await supabase.auth.getUser();
    const user = data.user;
    if (userError || !user) {
      setIsPending(false);
      setErrorMessages(["ログインしてください。"]);
      return;
    }
    formData.set("userId", user.id);

    const imageFile = formData.get("image") as File | null;

    if (imageFile && imageFile.size > 0) {
      const filePath = `beer-posts/${Date.now()}-${imageFile.name}`;
      const { error, data } = await supabase.storage
        .from("images")
        .upload(filePath, imageFile);
      if (error) {
        setIsPending(false);
        setErrorMessages([error.message]);
        return;
      }
      formData.set("imagePath", data.path);
    }
    formData.delete("image");

    const result = await createPost(formData);
    setIsPending(false);

    if (!result.success) {
      const messages = result.errors?.map(
        (err: { message: string }) => err.message
      ) ?? ["投稿に失敗しました"];

      setErrorMessages(messages);
      return;
    }

    setErrorMessages([]);
    setSuccessMessage("投稿しました");
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <section className="gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col p-2 gap-4">
        <label htmlFor="image" className={labelClassName}>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="sr-only"
            ref={imageInputRef}
            onChange={handleChangeImage}
          />

          {previewUrl ? (
            <PreviewImage
              previewUrl={previewUrl}
              onRemove={handleRemoveImage}
            />
          ) : (
            <PhotoIcon className="h-12 w-12 text-gray-400 transition-colors group-hover:text-amber-500" />
          )}
        </label>

        <div className="space-y-1.5">
          <label
            htmlFor="beerName"
            className="text-sm font-semibold text-gray-700"
          >
            Beer Name
            <span className="ml-2 inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600">
              Required
            </span>
          </label>
          <input
            id="beerName"
            name="beerName"
            placeholder="よなよなエール"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="countryCode"
              className="text-sm font-semibold text-gray-700"
            >
              Country
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
              Brewery
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
              Style
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
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">
            Scores
            <span className="ml-2 inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600">
              Required
            </span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ScoreSlider
              id="bodyScore"
              label="ボディ"
              value={scores.bodyScore}
              onChange={handleScoreChange}
            />
            <ScoreSlider
              id="sournessScore"
              label="酸味"
              value={scores.sournessScore}
              onChange={handleScoreChange}
            />
            <ScoreSlider
              id="sweetnessScore"
              label="甘味"
              value={scores.sweetnessScore}
              onChange={handleScoreChange}
            />
            <ScoreSlider
              id="aromaScore"
              label="香り"
              value={scores.aromaScore}
              onChange={handleScoreChange}
            />
            <ScoreSlider
              id="bitternessScore"
              label="苦味"
              value={scores.bitternessScore}
              onChange={handleScoreChange}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="comment"
            className="text-sm font-semibold text-gray-700"
          >
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            placeholder="最高"
            rows={3}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-1/2 py-3 rounded-full bg-black text-white font-semibold hover:opacity-80 transition"
          >
            {isPending ? "Sending..." : "Post"}
          </button>
        </div>
        {errorMessages.length > 0 && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {errorMessages.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        {successMessage && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
            {successMessage}
          </p>
        )}
      </form>
    </section>
  );
}
