import { toNodeHandler } from "better-auth/node";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { auth } from "./lib/auth";
import globalRouter from "./router";
import env from "./config/env";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);
app.all("/api/v1/auth/*splat", toNodeHandler(auth));
app.use("/api/v1", globalRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is running.",
  });
});

export default app;
