"use server";

import { prisma } from "@/lib/prisma";
import { profileSchema } from "./profileSchema";

export type CreateProfileResult =
  | { success: true }
  | {
      success: false;
      errors?: { path: (string | number)[]; message: string }[];
      message?: string;
    };

export async function createProfile(
  formData: FormData
): Promise<CreateProfileResult> {
  const parsed = profileSchema.safeParse({
    userId: formData.get("userId"),
    username: formData.get("username"),
    displayName: formData.get("display_name"),
    bio: formData.get("bio"),
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

  const { userId, username, displayName, bio } = parsed.data;

  try {
    const existingProfile = await prisma.user_profiles.findFirst({
      where: { user_id: userId },
    });

    if (existingProfile) {
      await prisma.user_profiles.update({
        where: { id: existingProfile.id },
        data: {
          username,
          display_name: displayName,
          bio,
        },
      });
    } else {
      await prisma.user_profiles.create({
        data: {
          user_id: userId,
          username,
          display_name: displayName,
          bio,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "プロフィールの保存に失敗しました。",
    };
  }
}
