import { Router } from "express";
import { postRouter } from "../module/post/post.router";

const globalRouter: Router = Router();

const moduleRoutes = [
  {
    path: "/posts",
    router: postRouter,
  },
];

moduleRoutes.forEach((module) => {
  globalRouter.use(module.path, module.router);
});

export default globalRouter;
