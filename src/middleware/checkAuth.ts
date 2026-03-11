import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import sendResponse from "../util/sendResponse";

const checkAuth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return sendResponse(res, {
        status: 401,
        success: false,
        message: "Authentication required. Please log in to continue.",
      });
    }

    if (!session.user.emailVerified) {
      return sendResponse(res, {
        status: 401,
        success: false,
        message:
          "Email verification required. Please verify your email to continue.",
      });
    }

    if (!roles.includes(session.user.role)) {
      return sendResponse(res, {
        status: 403,
        success: false,
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }

    req.user = session.user;

    next();
  };

export default checkAuth;
