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

const getCommentById = async (id: string): Promise<Comment> => {
  const data = await prisma.comment.findUniqueOrThrow({
    where: { id },
    include: { post: { select: { id: true, title: true } } },
  });
  return data;
};

const getCommentsByAuthor = async (authorId: string): Promise<Comment[]> => {
  const data = await prisma.comment.findMany({
    where: { authorId },
    orderBy: { createdAt: "desc" },
    include: { post: { select: { id: true, title: true } } },
  });
  return data;
};

const deleteCommentById = async (
  id: string,
  authorId: string,
): Promise<Comment> => {
  const data = await prisma.comment.delete({ where: { id, authorId } });
  return data;
};

export {
  insertCommentIntoDb,
  getCommentById,
  getCommentsByAuthor,
  deleteCommentById,
};
