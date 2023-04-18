import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppDataSource } from "../typeorm/typeorm.connection";
import { UserEntity } from "../models/entities/UserEntity";
import { TaskEntity } from "../models/entities/TaskEntity";
import { userRoles } from "../models/interface/userRoles";

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: userRoles;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
    }
  }
}
const userRepository = AppDataSource.getRepository(UserEntity);
const taskRepository = AppDataSource.getRepository(TaskEntity);

/**
 * @description this middleware checks if the provide jwt token is valid or not
 * @param req
 * @param res
 * @param next
 */
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

/**
 * @description this middleware check if the update request of task belongs to the requested user or not
 * @param req
 * @param res
 * @param next
 */
export const checkUserGuardMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  authGuardMiddleware(req, res, async () => {
    const taskId = Number(req.params.id);
    const user = req.user;
    const task = await taskRepository.findOne({ where: { id: taskId }, select: ["userId"] });
    if (task?.userId === user?.id) {
      next();
    } else {
      res.status(401).json({
        status: 401,
        message: "Unauthorized request",
      });
    }
  });
};

/**
 * @description this middleware is used to check the roles of users
 * @param userRoles
 * @returns
 */
export const roleBasedGuardMiddleware = (userRoles: userRoles[]) => async (req: Request, res: Response, next: NextFunction) => {
  authGuardMiddleware(req, res, () => {
    const user = req.user;

    if (user !== undefined) {
      if (userRoles.includes(user.role)) {
        next();
      } else {
        res.status(401).json({
          status: 401,
          message: "Unauhorized request",
        });
      }
    }
  });
};
