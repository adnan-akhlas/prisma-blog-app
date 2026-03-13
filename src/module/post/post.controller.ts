import { User } from "better-auth";
import { Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import * as postService from "./post.service";
import buildPaginationAndSorting from "../../helper/buildPaginationAndSorting";

const createPost = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const user = req.user;
    const data = await postService.insertPostIntoDb(body, user as User);
    sendResponse(res, {
      status: 201,
      success: true,
      message: "Post created successfully.",
      data,
    });
  },
);

const getPosts = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const queries = req.query as Record<string, string>;
    const paginationAndSorting = buildPaginationAndSorting(queries);
    const { data, meta } = await postService.getPostsFromDb(
      queries,
      paginationAndSorting,
    );
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Posts retrieved successfully.",
      meta,
      data,
    });
  },
);

export { createPost, getPosts };
