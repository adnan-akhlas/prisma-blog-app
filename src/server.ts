import http, { Server } from "node:http";
import env from "./config/env";
import { prisma } from "./lib/prisma";
import app from "./app";

const port = env.PORT;
let server: Server | null;

(async function main(): Promise<void> {
  try {
    server = http.createServer(app);
    server.listen(port, () => {
      console.log(`Server is listening to PORT:${port}`);
    });
    await prisma.$connect();
    console.log("Connected to database successfully.");
  } catch (error: unknown) {
    console.error("An error occurred.", error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
