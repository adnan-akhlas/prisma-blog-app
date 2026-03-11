import express, { Application, Request, Response } from "express";
import globalRouter from "./router";

const app: Application = express();

app.use(express.json());
app.use("/api/v1", globalRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is running.",
  });
});

export default app;
