"use server";

import { prisma } from "@/lib/prisma";

type DeletePostArgs = {
  postId: number;
  userId: string;
};

export async function deletePost({ postId, userId }: DeletePostArgs) {
  if (!userId) {
    return {
      success: false,
      message: "ユーザー情報が取得できませんでした。",
    };
  }

  try {
    const result = await prisma.beerPost.updateMany({
      where: {
        id: postId,
        userId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: "削除対象の投稿が見つかりませんでした。",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "投稿の削除に失敗しました。",
    };
  }
}


