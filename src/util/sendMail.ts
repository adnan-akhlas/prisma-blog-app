import transporter from "../config/nodemailer";

interface IMailPayload {
  receiver: string;
  subject: string;
  body: string;
}

async function sendMail({
  receiver,
  subject,
  body,
}: IMailPayload): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: '"Prisma Blog App" <dev.adnanakhlas@gmail.com>',
      to: receiver,
      subject: subject,
      html: body, // HTML version of the message
    });

    console.log("Message sent:", info.messageId);
  } catch (error: unknown) {
    console.error("Error occurred while sending email:", error);
  }
}

export default sendMail;
