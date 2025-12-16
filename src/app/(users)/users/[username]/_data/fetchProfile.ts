import { prisma } from "@/lib/prisma";

export type Profile = Awaited<ReturnType<typeof fetchProfile>>;

export async function fetchProfile(username: string) {
  return prisma.user_profiles.findUnique({
    where: { username },
    select: {
      username: true,
      display_name: true,
      bio: true,
      avatar_url: true,
    },
  });
}
