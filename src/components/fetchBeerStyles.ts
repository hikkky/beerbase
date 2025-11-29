"use server";

import { prisma } from "@/lib/prisma";

export type BeerStyles = NonNullable<
  Awaited<ReturnType<typeof fetchBeerStyles>>
>;

export async function fetchBeerStyles() {
  const beerStyles = await prisma.beerStyle.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return beerStyles;
}
