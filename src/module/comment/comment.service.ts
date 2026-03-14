import { Comment, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const insertCommentIntoDb = async (
  payload: Prisma.CommentUncheckedCreateInput,
): Promise<Comment> => {
  await prisma.post.findUniqueOrThrow({ where: { id: payload.postId } });

  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({ where: { id: payload.parentId } });
  }

  const data = await prisma.comment.create({
    data: payload,
  });

  return data;
};

const getCommentById = async (id: string): Promise<Comment | null> => {
  const data = await prisma.comment.findUniqueOrThrow({
    where: { id },
    include: { post: { select: { id: true, title: true } } },
  });
  return data;
};

export { insertCommentIntoDb, getCommentById };
