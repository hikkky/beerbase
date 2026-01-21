import { prisma } from "@/lib/prisma";

export type BeerPost = NonNullable<Awaited<ReturnType<typeof fetchBeerPost>>>;

export async function fetchBeerPost(postId: number) {
  return prisma.beerPost.findUnique({
    where: { id: postId },
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
          user_profiles: {
            select: {
              username: true,
              display_name: true,
              avatar_url: true,
            },
          },
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
}
