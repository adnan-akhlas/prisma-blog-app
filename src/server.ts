import env from "./config/env";
import { prisma } from "./lib/prisma";

const port = env.PORT;

(async function main(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully.");
  } catch (error: unknown) {
    console.error("An error occurred.", error);
    process.exit(1);
  }
})();
