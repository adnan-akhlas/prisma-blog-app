import express, { Application, Request, Response } from "express";
import globalRouter from "./router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app: Application = express();

app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/v1", globalRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is running.",
  });
});

export default app;
