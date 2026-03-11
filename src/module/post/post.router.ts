import { Router } from "express";
import * as postController from "./post.controller";
import checkAuth from "../../middleware/checkAuth";

const router: Router = Router();

router.post("/", checkAuth("ADMIN", "USER"), postController.createPost);
router.get("/", postController.getPosts);

export const postRouter = router;
