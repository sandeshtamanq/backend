import { Request, Response, Router } from "express";
import { validationMiddleware } from "../../middleware/validationMiddleware";
import { LoginDto } from "../../models/dto/LoginDto";
import { RegisterDto } from "../../models/dto/RegisterDto";

import { AuthService } from "../../service/AuthService";
const router = Router();

const authService = new AuthService();

router.post("/login", validationMiddleware(LoginDto), (req: Request, res: Response) => authService.login(req, res));

router.post("/register", validationMiddleware(RegisterDto), (req: Request, res: Response) => authService.register(req, res));

export { router as authRoutes };
