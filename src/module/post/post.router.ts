import { UserRole } from "@prisma/client";
import { Router } from "express";
import checkAuth from "../../middleware/checkAuth";
import * as postController from "./post.controller";

const router: Router = Router();

router.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  postController.createPost,
);
router.get("/", postController.getPosts);

export const postRouter = router;
