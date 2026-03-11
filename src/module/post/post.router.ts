import { Router } from "express";
import * as postController from "./post.controller";

const router: Router = Router();

router.post("/", postController.createPost);
router.get("/", postController.getPosts);

export const postRouter = router;
