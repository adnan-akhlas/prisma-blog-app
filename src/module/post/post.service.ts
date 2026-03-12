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
  console.log(queries);
  const posts = await prisma.post.findMany({
    where: {
      ...(queries?.q && {
        title: { contains: queries.q, mode: "insensitive" },
      }),
    },
  });
  return posts;
};

export { insertPostIntoDb, getPostsFromDb };
