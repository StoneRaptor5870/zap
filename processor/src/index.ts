import { configDotenv } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { Kafka, logLevel } from "kafkajs";

configDotenv();
const TOPIC_NAME = "zap-events";
const client = new PrismaClient();

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER as string],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKA_USERNAME as string,
      password: process.env.KAFKA_PASSWORD as string
  },
  logLevel: logLevel.ERROR,
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();
  console.log("Kafka producer connected");

  while (1) {
    const pendingRows = await client.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });
    console.log(pendingRows);

    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((r) => {
        return {
          value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 }),
        };
      }),
    });

    await client.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((x) => x.id),
        },
      },
    });
  }
}

main();
