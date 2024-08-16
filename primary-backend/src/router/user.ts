import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware, AuthRequest } from "../middleware";
import { prismaClient } from "../db";
import { SigninSchema, SignupSchema } from "../types";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (userExists) {
    return res.status(403).json({
      message: "User already exists",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(parsedData.data.password, salt);

  const user = await prismaClient.user.create({
    data: {
      email: parsedData.data.email,
      password: hashedPassword,
      name: parsedData.data.name,
    },
  });

  const jwtToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_PASSWORD as string,
    {
      expiresIn: "1d",
    }
  );

  // await sendEmail();

  return res.json({
    message: "Signed up succesfully",
    token: jwtToken
  });
});

router.post("/signin", async (req: Request, res: Response) => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "User Not Found. Signup First.",
    });
  }

  const passwordMatched = await bcrypt.compare(
    parsedData.data.password,
    user.password
  );

  if (!passwordMatched) {
    return res.status(400).send({ message: "wrong password" });
  }

  // sign the jwt
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_PASSWORD as string,
    {
      expiresIn: "1d",
    }
  );

  res.json({
    message: "Signed in succesfully.",
    token: token,
  });
});

router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return res.json({
    user,
  });
});

export const userRouter = router;
