import z from "zod";

const preprocessNullable = (v: unknown) =>
  v === "" || v === null || typeof v === "undefined" ? undefined : v;

export const profileSchema = z.object({
  userId: z.string().uuid("ユーザー情報が不正です。"),
  username: z
    .string()
    .trim()
    .min(1, "ユーザー名は必須です。")
    .max(30, "ユーザー名は30文字以内で入力してください。")
    .regex(/^[a-zA-Z0-9_]+$/, "英数字とアンダースコアのみ使用できます。"),
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
});
