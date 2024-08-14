import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

configDotenv();

const client = new PrismaClient();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// https://hooks.zapier.com/hooks/catch/17043103/22b8496/
// password logic

app.post("/hooks/catch/:userId/:zapId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  // store in db a new trigger
  await client.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });
  res.status(200).json({
    message: "Webhook received",
  });
});

app.listen(PORT, () => {
    console.log(`Webhook server is running on ${PORT}.`)
});