import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(to: string, body: string) {
  await transport.sendMail({
    from: process.env.SMTP_LOGIN,
    sender: "Nischay",
    to,
    subject: "Hello from Zap",
    text: body,
  });
}
