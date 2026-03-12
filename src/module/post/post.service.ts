import { Post } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { TCreatePost } from "./post.types";
import { User } from "better-auth";

const insertPostIntoDb = async (
  postinfo: TCreatePost,
  userinfo: User,
): Promise<Post> => {
  const newPost = await prisma.post.create({
    data: {
      ...postinfo,
      authorId: userinfo.id,
    },
  });
  return newPost;
};

const getPostsFromDb = async (queries: any): Promise<Post[]> => {
  const posts = await prisma.post.findMany({
    where: {
      ...(queries?.q && {
        OR: [
          { title: { contains: queries.q, mode: "insensitive" } },
          { content: { contains: queries.q, mode: "insensitive" } },
          { tags: { has: queries.q } },
        ],
      }),
      ...(queries.tags && {
        tags: { hasEvery: queries.tags.split(",") },
      }),
      ...(queries.featured && {
        isFeatured: JSON.parse(queries.featured),
      }),
      ...(queries.status && {
        status: queries.status.toUpperCase(),
      }),
    },
  });
  return posts;
};

export { insertPostIntoDb, getPostsFromDb };
