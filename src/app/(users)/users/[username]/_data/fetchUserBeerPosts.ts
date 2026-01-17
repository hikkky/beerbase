import { prisma } from "@/lib/prisma";

type BeerPosts = Awaited<ReturnType<typeof fetchUserBeerPosts>>;
export type BeerPost = BeerPosts[number];

export async function fetchUserBeerPosts(userId: string) {
  const beerPosts = await prisma.beerPost.findMany({
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
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return beerPosts;
}
