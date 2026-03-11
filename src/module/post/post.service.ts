import { Post } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { TCreatePost } from "./post.types";

const insertPostIntoDb = async (postinfo: TCreatePost): Promise<Post> => {
  const newPost = await prisma.post.create({
    data: postinfo,
  });
  return newPost;
};

const getPostsFromDb = async (): Promise<Post[]> => {
  const posts = await prisma.post.findMany({});
  return posts;
};

export { insertPostIntoDb, getPostsFromDb };
