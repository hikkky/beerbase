"use server";

import { prisma } from "@/lib/prisma";

export async function createPost(formData: FormData) {
  const beerName = formData.get("beerName");
  const breweryName = formData.get("breweryName");
  const beerStyle = formData.get("beerStyle");
  const countryCode = formData.get("countryCode");
  const abvRaw = formData.get("abv");
  const ibuRaw = formData.get("ibu");
  const comment = formData.get("comment");

  if (typeof beerName !== "string" || beerName.trim().length === 0) {
    throw new Error("ビール名を入力してください。");
  }

  // styleはselectの値（id）を受け取る
  if (typeof beerStyle !== "string" || beerStyle.trim().length === 0) {
    throw new Error("スタイルを選択してください。");
  }

  const abv =
    typeof abvRaw === "string" && abvRaw.trim().length > 0
      ? parseFloat(abvRaw)
      : null;
  const ibu =
    typeof ibuRaw === "string" && ibuRaw.trim().length > 0
      ? parseInt(ibuRaw, 10)
      : null;

  // 仮のユーザー（先頭のユーザー）に紐づける。実運用では認証ユーザーのIDを使う。
  const user = await prisma.user.findFirst();
  if (!user) {
    throw new Error("ユーザーが存在しません。先にユーザーを作成してください。");
  }

  const post = await prisma.beerPost.create({
    data: {
      beerName,
      breweryName: typeof breweryName === "string" ? breweryName : null,
      abv,
      ibu,
      comment:
        typeof comment === "string" && comment.trim().length > 0
          ? comment
          : null,
      styleId: BigInt(beerStyle),
      userId: user.id,
      // 必須スコア系は暫定で0を入れる（入力項目が揃ったら更新）
      bodyScore: 3,
      sournessScore: 3,
      sweetnessScore: 3,
      aromaScore: 3,
      bitternessScore: 3,
      countryCode: typeof countryCode === "string" ? countryCode : null,
    },
  });

  return { success: true, postId: post.id };
}
