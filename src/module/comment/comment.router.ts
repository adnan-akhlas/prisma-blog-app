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

router.get(
  "/:commentId",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  commentController.getSingleComment,
);

export { router as commentRouter };
