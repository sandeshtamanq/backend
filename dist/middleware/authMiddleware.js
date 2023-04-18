"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const authGuardMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerToken = req.headers.authorization;
    const jwtToken = bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.split(" ")[1];
    if (jwtToken) {
        jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET_KEY, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(401).json({
                    status: 401,
                    message: "Unauthorized request",
                });
            }
            else {
                const payload = decode;
                const user = yield userRepository.findOne({ where: { email: payload.email } });
                req.user = user;
                next();
            }
        }));
    }
    else {
        res.status(401).json({
            status: 401,
            message: "Unauthorized request",
        });
    }
});
exports.authGuardMiddleware = authGuardMiddleware;
const checkUserGuardMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, exports.authGuardMiddleware)(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const taskId = Number(req.params.id);
        const user = req.user;
        const task = yield taskRepository.findOne({ where: { id: taskId }, select: ["userId"] });
        if ((task === null || task === void 0 ? void 0 : task.userId) === (user === null || user === void 0 ? void 0 : user.id)) {
            next();
        }
        else {
            res.status(401).json({
                status: 401,
                message: "Unauthorized request",
            });
        }
    }));
});
exports.checkUserGuardMiddleware = checkUserGuardMiddleware;
const roleBasedGuardMiddleware = (userRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.roleBasedGuardMiddleware = roleBasedGuardMiddleware;
//# sourceMappingURL=authMiddleware.js.map