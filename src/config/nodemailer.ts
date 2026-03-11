import nodemailer from "nodemailer";
import env from "./env";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: env.NODE_ENV === "production" ? 465 : 587,
  secure: env.NODE_ENV === "production" ? true : false,
  auth: {
    user: env.NODEMAILER_USER,
    pass: env.NODEMAILER_PASS,
  },
});

export default transporter;
