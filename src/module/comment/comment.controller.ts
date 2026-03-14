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

const getSingleComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const data = await commentService.getCommentById(commentId as string);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Comment retrieved successfully.",
    data,
  });
});

const getCommentsByAuthor = catchAsync(async (req: Request, res: Response) => {
  const { authorId } = req.params;
  const data = await commentService.getCommentsByAuthor(authorId as string);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Comments retrieved successfully.",
    data,
  });
});

const deleteSingleComment = catchAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.user as User;
  const { commentId } = req.params;
  const data = await commentService.deleteCommentById(
    commentId as string,
    userId,
  );
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Comment deleted successfully.",
    data,
  });
});

export {
  createComment,
  getSingleComment,
  getCommentsByAuthor,
  deleteSingleComment,
};
