import { prisma } from "@/lib/prisma";

type BeerPosts = Awaited<ReturnType<typeof fetchBeerPosts>>;
export type BeerPost = BeerPosts[number];

export async function fetchBeerPosts() {
  const beerPosts = await prisma.beerPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      beerName: true,
      breweryName: true,
      abv: true,
      ibu: true,
      comment: true,
      countryCode: true,
      bodyScore: true,
      sournessScore: true,
      sweetnessScore: true,
      aromaScore: true,
      bitternessScore: true,
      createdAt: true,
      user: {
        select: {
          id: true,
        },
      },
      images: {
        select: {
          imageUrl: true,
        },
      },
      style: {
        select: {
          name: true,
        },
      },
      styleCustom: true,
    },
  });
  return beerPosts;
}
