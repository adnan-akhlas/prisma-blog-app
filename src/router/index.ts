import { Router } from "express";
import { postRouter } from "../module/post/post.router";
import { commentRouter } from "../module/comment/comment.router";

const globalRouter: Router = Router();

const moduleRoutes = [
  {
    path: "/posts",
    router: postRouter,
  },
  {
    path: "/comments",
    router: commentRouter,
  },
];

moduleRoutes.forEach((module) => {
  globalRouter.use(module.path, module.router);
});

export default globalRouter;
