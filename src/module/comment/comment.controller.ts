import { Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import * as commentService from "./comment.service";
import { User } from "better-auth";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  payload.authorId = (req.user as User).id;
  const data = await commentService.insertCommentIntoDb(payload);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "Comment successfully.",
    data,
  });
});

export { createComment };
