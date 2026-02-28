"use client";

import { PhotoIcon } from "@/components/icons";
import { supabase } from "@/lib/supabase/supabaseClient";
import { getImageUrl } from "@/utils/getImageUrl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Profile } from "../../_data/fetchProfile";
import { updateProfile } from "./actions/updateProfile";

interface Props {
  profile: Profile;
}

export function EditProfileForm({ profile }: Props) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(profile.display_name ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    profile.avatar_url ? getImageUrl(profile.avatar_url) : null,
  );
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (previewUrl && !previewUrl.startsWith("blob:")) {
      // 既存の画像URLの場合は何もしない（blob URLのみrevoke）
    }

    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoading(true);
    setErrors([]);
    setMessage(null);

    const { data: userResult, error: userError } =
      await supabase.auth.getUser();
    const user = userResult?.user;

    if (userError || !user) {
      setIsLoading(false);
      setErrors([
        "ログイン状態を確認できませんでした。ログインし直してください。",
      ]);
      return;
    }

    formData.append("userId", user.id);

    const imageFile = formData.get("avatar") as File | null;

    if (imageFile && imageFile.size > 0) {
      const filePath = `avatars/${Date.now()}-${imageFile.name}`;
      const { error, data } = await supabase.storage
        .from("images")
        .upload(filePath, imageFile);
      if (error) {
        setIsLoading(false);
        setErrors([error.message]);
        return;
      }
      formData.set("avatarUrl", data.path);
    } else if (!previewUrl) {
      // 画像が削除された場合（既存の画像があってもなくても）
      formData.set("avatarUrl", "");
    } else if (previewUrl && !previewUrl.startsWith("blob:")) {
      // 既存の画像をそのまま使用
      formData.set("avatarUrl", profile.avatar_url ?? "");
    } else {
      // プレビューがあるがblob URLの場合（新しい画像が選択されているが、まだアップロードしていない）
      // この場合は上記のimageFileチェックで処理されるはずなので、ここには来ない
      formData.set("avatarUrl", profile.avatar_url ?? "");
    }
    formData.delete("avatar");

    const result = await updateProfile(formData, profile.user_id);

    setIsLoading(false);

    if (!result.success) {
      const messages = result.errors?.map((err) => err.message) ?? [
        result.message ?? "プロフィールの更新に失敗しました。",
      ];

      setErrors(messages);
      return;
    }

    setErrors([]);
    setMessage("プロフィールを更新しました。");
    router.push(`/users/${profile.username}`);
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const labelClassName = previewUrl
    ? "group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200"
    : "group flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-200 px-6 py-10 transition-colors hover:border-amber-400 hover:bg-amber-50/40";

  return (
    <div className="bg-white/80 backdrop-blur border border-amber-100 shadow-lg rounded-2xl p-8 space-y-8">
      <header className="text-center space-y-2">
        <p className="text-sm font-medium text-amber-700">Edit Profile</p>
        <h1 className="text-3xl font-bold text-gray-900">プロフィール編集</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="avatar" className={labelClassName}>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              className="sr-only"
              ref={imageInputRef}
              onChange={handleChangeImage}
            />

            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="アバター画像のプレビュー"
                  className="h-48 w-full object-cover"
                />
                <button
                  type="button"
                  aria-label="選択した画像を削除"
                  className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-gray-800"
                  onClick={handleRemoveImage}
                >
                  ×
                </button>
              </div>
            ) : (
              <PhotoIcon className="h-12 w-12 text-gray-400 transition-colors group-hover:text-amber-500" />
            )}
          </label>
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
            placeholder="ビール大好き太郎"
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

        <div className="flex gap-3">
          <Link
            href={`/users/${profile.username}`}
            className="flex-1 px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition text-center"
          >
            キャンセル
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {isLoading ? "更新中..." : "更新する"}
          </button>
        </div>
      </form>

      {errors.length > 0 && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 space-y-0.5">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      {message && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
          {message}
        </p>
      )}
    </div>
  );
}
