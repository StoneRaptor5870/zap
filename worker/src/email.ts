import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(to: string, body: string) {
  await transport.sendMail({
    from: "nischay",
    sender: process.env.SMTP_LOGIN,
    to,
    subject: "Hello from Zap",
    text: body,
  });
}
