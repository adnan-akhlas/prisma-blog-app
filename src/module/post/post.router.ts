import { Router } from "express";
import * as postController from "./post.controller";
import checkAuth, { UserRole } from "../../middleware/checkAuth";

const router: Router = Router();

router.post(
  "/",
  checkAuth(UserRole.ADMIN, UserRole.USER),
  postController.createPost,
);
router.get("/", postController.getPosts);

export const postRouter = router;
