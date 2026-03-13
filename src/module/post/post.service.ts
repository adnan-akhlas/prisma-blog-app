import { Post, PostStatus, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { TCreatePost } from "./post.types";
import { User } from "better-auth";
import { IPaginationAndSorting } from "../../helper/buildPaginationAndSorting";

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

const getPostsFromDb = async (
  queries: Record<string, string>,
  { page, limit, skip, sortBy, sortOrder }: IPaginationAndSorting,
): Promise<Post[]> => {
  const postFilterInput: Prisma.PostWhereInput = {
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
      status: queries.status.toUpperCase() as PostStatus,
    }),
    ...(queries.author && {
      authorId: queries.author,
    }),
  };
  const posts = await prisma.post.findMany({
    where: postFilterInput,
    take: limit,
    skip: skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  return posts;
};

export { insertPostIntoDb, getPostsFromDb };
