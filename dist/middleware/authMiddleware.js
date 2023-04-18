"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleBasedGuardMiddleware = exports.checkUserGuardMiddleware = exports.authGuardMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_connection_1 = require("../typeorm/typeorm.connection");
const UserEntity_1 = require("../models/entities/UserEntity");
const TaskEntity_1 = require("../models/entities/TaskEntity");
const userRepository = typeorm_connection_1.AppDataSource.getRepository(UserEntity_1.UserEntity);
const taskRepository = typeorm_connection_1.AppDataSource.getRepository(TaskEntity_1.TaskEntity);
const authGuardMiddleware = async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    const jwtToken = bearerToken?.split(" ")[1];
    if (jwtToken) {
        jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET_KEY, async (err, decode) => {
            if (err) {
                res.status(401).json({
                    status: 401,
                    message: "Unauthorized request",
                });
            }
            else {
                const payload = decode;
                const user = await userRepository.findOne({ where: { email: payload.email } });
                req.user = user;
                next();
            }
        });
    }
    else {
        res.status(401).json({
            status: 401,
            message: "Unauthorized request",
        });
    }
};
exports.authGuardMiddleware = authGuardMiddleware;
const checkUserGuardMiddleware = async (req, res, next) => {
    (0, exports.authGuardMiddleware)(req, res, async () => {
        const taskId = Number(req.params.id);
        const user = req.user;
        const task = await taskRepository.findOne({ where: { id: taskId }, select: ["userId"] });
        if (task?.userId === user?.id) {
            next();
        }
        else {
            res.status(401).json({
                status: 401,
                message: "Unauthorized request",
            });
        }
    });
};
exports.checkUserGuardMiddleware = checkUserGuardMiddleware;
const roleBasedGuardMiddleware = (userRoles) => async (req, res, next) => {
    (0, exports.authGuardMiddleware)(req, res, () => {
        const user = req.user;
        if (user !== undefined) {
            if (userRoles.includes(user.role)) {
                next();
            }
            else {
                res.status(401).json({
                    status: 401,
                    message: "Unauhorized request",
                });
            }
        }
    });
};
exports.roleBasedGuardMiddleware = roleBasedGuardMiddleware;
//# sourceMappingURL=authMiddleware.js.map