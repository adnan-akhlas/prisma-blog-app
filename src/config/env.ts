import "dotenv/config";

interface IENV {
  PORT: string;
  DATABASE_URL: string;
}

type TENV = keyof IENV;

const REQUIRED_ENV: TENV[] = ["PORT", "DATABASE_URL"];

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
