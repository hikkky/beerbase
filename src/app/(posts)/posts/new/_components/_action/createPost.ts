"use server";

import { prisma } from "@/lib/prisma";
import { postSchema } from "./postSchema";

export async function createPost(formData: FormData) {
  const parsed = postSchema.safeParse({
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

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    };
  }

  // 仮のユーザー（先頭のユーザー）に紐づける。実運用では認証ユーザーのIDを使う。
  const user = await prisma.user.findFirst();
  if (!user) {
    throw new Error("ユーザーが存在しません。先にユーザーを作成してください。");
  }

  try {
    await prisma.beerPost.create({
      data: {
        beerName: parsed.data.beerName,
        breweryName: parsed.data.breweryName,
        abv: parsed.data.abv,
        ibu: parsed.data.ibu,
        comment: parsed.data.comment,
        styleId: parsed.data.beerStyle ? BigInt(parsed.data.beerStyle) : null,
        userId: user.id,
        bodyScore: parsed.data.bodyScore,
        sournessScore: parsed.data.sournessScore,
        sweetnessScore: parsed.data.sweetnessScore,
        aromaScore: parsed.data.aromaScore,
        bitternessScore: parsed.data.bitternessScore,
        countryCode: parsed.data.countryCode,
      },
    });

    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
    };
  }
}
