import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppDataSource } from "../typeorm/typeorm.connection";
import { UserEntity } from "../models/entities/UserEntity";

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
    }
  }
}
const userRepository = AppDataSource.getRepository(UserEntity);

export const authGuardMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;
  const jwtToken = bearerToken?.split(" ")[1];
  if (jwtToken) {
    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY!, async (err, decode) => {
      if (err) {
        res.status(401).json({
          status: 401,
          message: "Unauthorized request",
        });
      } else {
        const payload = decode as UserInterface;
        const user = await userRepository.findOne({ where: { email: payload.email } });
        req.user = user as UserInterface;
        next();
      }
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "Unauthorized request",
    });
  }
};
