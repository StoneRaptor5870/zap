import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";
import { triggerRouter } from "./router/trigger";
import { actionRouter } from "./router/action";

configDotenv();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.use("/", (req: Request, res: Response) => {
  res.send("<h1>Hello from the zap primary backend server!!!</h1>");
});

app.use("/api/v1/user", userRouter);

app.use("/api/v1/zap", zapRouter);

app.use("/api/v1/trigger", triggerRouter);

app.use("/api/v1/action", actionRouter);

app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}.`)
});
