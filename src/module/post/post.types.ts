import { Post } from "@prisma/client";

export type TCreatePost = Omit<Post, "id" | "createdAt" | "updatedAt">;
