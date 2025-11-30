"use server";

import { prisma } from "@/lib/prisma";
import { postSchema } from "./postSchema";

export async function createPost(formData: FormData) {
  const parsed = postSchema.parse({
    beerName: formData.get("beerName"),
    breweryName: formData.get("breweryName"),
    beerStyle: formData.get("beerStyle"),
    countryCode: formData.get("countryCode"),
    abv: formData.get("abv"),
    ibu: formData.get("ibu"),
    comment: formData.get("comment"),
    bodyScore: formData.get("bodyScore"),
    sournessScore: formData.get("sournessScore"),
    sweetnessScore: formData.get("sweetnessScore"),
    aromaScore: formData.get("aromaScore"),
    bitternessScore: formData.get("bitternessScore"),
  });

  // 仮のユーザー（先頭のユーザー）に紐づける。実運用では認証ユーザーのIDを使う。
  const user = await prisma.user.findFirst();
  if (!user) {
    throw new Error("ユーザーが存在しません。先にユーザーを作成してください。");
  }

  const post = await prisma.beerPost.create({
    data: {
      beerName: parsed.beerName,
      breweryName: parsed.breweryName,
      abv: parsed.abv,
      ibu: parsed.ibu,
      comment: parsed.comment,
      styleId: parsed.beerStyle ? BigInt(parsed.beerStyle) : null,
      userId: user.id,
      bodyScore: parsed.bodyScore,
      sournessScore: parsed.sournessScore,
      sweetnessScore: parsed.sweetnessScore,
      aromaScore: parsed.aromaScore,
      bitternessScore: parsed.bitternessScore,
      countryCode: parsed.countryCode,
    },
  });

  return { success: true, postId: post.id };
}
