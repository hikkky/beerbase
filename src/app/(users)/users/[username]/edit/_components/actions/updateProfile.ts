"use server";

import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "./updateProfileSchema";

export type UpdateProfileResult =
  | { success: true }
  | {
      success: false;
      errors?: { path: (string | number)[]; message: string }[];
      message?: string;
    };

export async function updateProfile(
  formData: FormData,
  profileUserId: string
): Promise<UpdateProfileResult> {

  const parsed = updateProfileSchema.safeParse({
    userId: formData.get("userId"),
    displayName: formData.get("display_name"),
    bio: formData.get("bio"),
    avatarUrl: formData.get("avatarUrl"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((issue) => ({
        path: issue.path.filter(
          (p): p is string | number => typeof p === "string" || typeof p === "number"
        ),
        message: issue.message,
      })),
    };
  }

  const { userId, displayName, bio, avatarUrl } = parsed.data;

  // 認可チェック: 現在のユーザーが自分のプロフィールを編集できるか
  if (userId !== profileUserId) {
    return {
      success: false,
      message: "このプロフィールを編集する権限がありません。",
    };
  }

  try {
    const existingProfile = await prisma.user_profiles.findFirst({
      where: { user_id: profileUserId },
    });

    if (!existingProfile) {
      return {
        success: false,
        message: "プロフィールが見つかりませんでした。",
      };
    }

    await prisma.user_profiles.update({
      where: { id: existingProfile.id },
      data: {
        display_name: displayName,
        bio,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "プロフィールの更新に失敗しました。",
    };
  }
}

