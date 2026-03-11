import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import sendMail from "../util/sendMail";
import env from "../config/env";

export const auth = betterAuth({
  basePath: "/api/v1/auth",
  trustedOrigins: [env.FRONTEND_URL],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const emailVerificationUrl = `${env.FRONTEND_URL}/auth/verify-email?token=${token}`;
      // send email
      sendMail({
        receiver: user.email,
        subject: "Verify your email address",
        body: `Click the link to verify your email: ${emailVerificationUrl}`,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
      },
    },
  },
});
