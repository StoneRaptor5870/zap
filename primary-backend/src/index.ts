import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import { userRouter } from "./router/user";

configDotenv();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}.`)
});
