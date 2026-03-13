import { UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth";
import env from "../config/env";

const seedAdmin = async (): Promise<void> => {
  try {
    console.log("Starting admin seed...");

    const adminInfo = {
      name: env.ADMIN_NAME,
      email: env.ADMIN_EMAIL,
      role: UserRole.ADMIN,
      password: env.ADMIN_PASSWORD,
    };

    console.log("Checking if admin already exists...");

    const isAdminExist = await prisma.user.findUnique({
      where: {
        email: adminInfo.email,
      },
    });

    if (isAdminExist) {
      console.log("Admin already exists. Skipping seed.");
      return;
    }

    console.log("Creating admin user...");

    const createAdminResponse = await auth.api.signUpEmail({
      body: { ...adminInfo },
      asResponse: true,
    });

    if (!createAdminResponse.ok) {
      console.error("Failed to create admin.");
      return;
    }

    console.log("Admin created successfully.");

    console.log("Verifying admin email...");

    await prisma.user.update({
      where: { email: adminInfo.email },
      data: { emailVerified: true },
    });

    console.log("Admin email verified.");

    console.log("Admin seed completed successfully.");
  } catch (error: unknown) {
    console.error(error);
  }
};

seedAdmin();
