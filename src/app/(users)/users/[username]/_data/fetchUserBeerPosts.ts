import { prisma } from "@/lib/prisma";

type BeerPosts = Awaited<ReturnType<typeof fetchUserBeerPosts>>;
export type BeerPost = BeerPosts[number];

export async function fetchUserBeerPosts(userId: string) {
  const beerPosts = await prisma.beerPost.findMany({
    select: {
      id: true,
      beerName: true,
      userId: true,
      images: {
        select: {
          imageUrl: true,
        },
      },
    },
    where: {
      userId,
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return beerPosts;
}
