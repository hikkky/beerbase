import { z } from "zod";

const scoreSchema = z
  .coerce.number()
  .min(0, "0以上で入力してください。")
  .max(5, "5以下で入力してください。")
  .refine((v) => Number.isInteger(v * 2), "0.5刻みで入力してください。");

const nullableNumber = z
  .preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.coerce.number().finite()
  )
  .optional()
  .transform((v) => (typeof v === "number" ? v : null));

const nullableString = z
  .preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.string().trim()
  )
  .optional()
  .transform((v) => (typeof v === "string" ? v : null));

export const postSchema = z.object({
  beerName: z.string().trim().min(1, "ビール名は必須です。"),
  beerStyle: nullableString,
  breweryName: nullableString,
  countryCode: nullableString,
  abv: nullableNumber,
  ibu: nullableNumber,
  comment: nullableString,
  bodyScore: scoreSchema,
  sournessScore: scoreSchema,
  sweetnessScore: scoreSchema,
  aromaScore: scoreSchema,
  bitternessScore: scoreSchema,
});

export type PostInput = z.infer<typeof postSchema>;
