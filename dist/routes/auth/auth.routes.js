"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const validationMiddleware_1 = require("../../middleware/validationMiddleware");
const LoginDto_1 = require("../../models/dto/LoginDto");
const RegisterDto_1 = require("../../models/dto/RegisterDto");
const AuthService_1 = require("../../service/AuthService");
const router = (0, express_1.Router)();
exports.authRoutes = router;
const authService = new AuthService_1.AuthService();
router.post("/login", (0, validationMiddleware_1.validationMiddleware)(LoginDto_1.LoginDto), (req, res) => authService.login(req, res));
router.post("/register", (0, validationMiddleware_1.validationMiddleware)(RegisterDto_1.RegisterDto), (req, res) => authService.register(req, res));
//# sourceMappingURL=auth.routes.js.map