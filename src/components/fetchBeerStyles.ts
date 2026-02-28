"use server";

import { prisma } from "@/lib/prisma";

export type BeerStyle = {
  id: bigint;
  name: string;
};

export type BeerStyles = BeerStyle[];

export async function fetchBeerStyles(): Promise<BeerStyles> {
  const beerStyles = await prisma.beerStyle.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return beerStyles;
}
