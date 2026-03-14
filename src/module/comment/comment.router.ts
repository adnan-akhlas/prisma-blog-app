import { Router } from "express";
import * as commentController from "./comment.controller";
import checkAuth from "../../middleware/checkAuth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  commentController.createComment,
);

router.get("/author/:authorId", commentController.getCommentsByAuthor);

router.get("/:commentId", commentController.getSingleComment);

router.delete("/:commentId", commentController.deleteSingleComment);

export { router as commentRouter };
