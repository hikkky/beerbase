import { prisma } from "@/lib/prisma";

export type Profile = NonNullable<Awaited<ReturnType<typeof fetchProfile>>>;

export async function fetchProfile(username: string) {
  return prisma.user_profiles.findUnique({
    where: { username },
    select: {
      user_id: true,
      username: true,
      display_name: true,
      bio: true,
      avatar_url: true,
    },
  });
}
