import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import sendMail from "../util/sendMail";
import env from "../config/env";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  basePath: "/api/v1/auth",
  trustedOrigins: [env.FRONTEND_URL],
  advanced: {
    cookies: {
      session_token: {
        name: "access_token",
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const emailVerificationUrl = `${env.FRONTEND_URL}/auth/verify-email?token=${token}`;
      console.log(url);
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
