import "dotenv/config";

interface IENV {
  PORT: string;
  DATABASE_URL: string;
  FRONTEND_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  NODEMAILER_USER: string;
  NODEMAILER_PASS: string;
}

type TENV = keyof IENV;

const REQUIRED_ENV: TENV[] = [
  "PORT",
  "DATABASE_URL",
  "FRONTEND_URL",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
  "NODEMAILER_USER",
  "NODEMAILER_PASS",
];

const checkEnv = (): IENV => {
  const env = {} as IENV;
  REQUIRED_ENV.forEach((key) => {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing required env: ${key}`);
    }
    env[key] = value;
  });

  return env;
};

const env = checkEnv();
export default env;
