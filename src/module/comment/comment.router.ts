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

export { router as commentRouter };
