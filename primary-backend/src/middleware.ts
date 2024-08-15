import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export interface AuthRequest extends Request {
  id?: number;
}

export function authMiddleware(
  req: AuthRequest, res: Response, next: NextFunction
) {
  const token = req.headers.authorization;

  try {
    if (!token) {
      return res.status(401).send({ message: "You are Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_PASSWORD!, (err: JsonWebTokenError | null, data: any) => {
      if (err) {
        return res.status(401).send({ message: "You are Unauthorized" });
      }
      req.id = data.id;
      next();
    });
  } catch (e) {
    return res.status(500).send({ message: "Something went wrong!" });
  }
}
