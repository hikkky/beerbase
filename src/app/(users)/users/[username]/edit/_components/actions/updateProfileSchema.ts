import z from "zod";

const preprocessNullable = (v: unknown) =>
  v === "" || v === null || typeof v === "undefined" ? undefined : v;

export const updateProfileSchema = z.object({
  userId: z.string().uuid("ユーザー情報が不正です。"),
  displayName: z
    .preprocess(
      preprocessNullable,
      z
        .string()
        .trim()
        .max(50, "表示名は50文字以内で入力してください。")
        .optional()
    )
    .transform((v) => (typeof v === "string" ? v : null)),
  bio: z
    .preprocess(
      preprocessNullable,
      z
        .string()
        .trim()
        .max(200, "自己紹介は200文字以内で入力してください。")
        .optional()
    )
    .transform((v) => (typeof v === "string" ? v : null)),
  avatarUrl: z
    .preprocess(
      preprocessNullable,
      z.string().optional()
    )
    .transform((v) => (typeof v === "string" ? v : null)),
});

