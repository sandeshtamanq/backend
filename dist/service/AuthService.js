"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const UserEntity_1 = require("../models/entities/UserEntity");
const typeorm_connection_1 = require("../typeorm/typeorm.connection");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    userRepository = typeorm_connection_1.AppDataSource.getRepository(UserEntity_1.UserEntity);
    hashPassword(password) {
        return bcrypt.hash(password, 12);
    }
    comparePassword(password, hashPassword) {
        return bcrypt.compare(password, hashPassword);
    }
    async register(req, res) {
        const registerDto = req.body;
        const hashedPassword = await this.hashPassword(registerDto.password);
        const newUser = this.userRepository.create({
            email: registerDto.email,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            password: hashedPassword,
        });
        try {
            await this.userRepository.save(newUser);
            return res.status(201).json({
                status: 201,
                message: "User created successfully",
            });
        }
        catch (err) {
            if (err.code === "23505") {
                return res.status(409).json({
                    message: "User with that email already exists!",
                });
            }
            return res.status(500).json({
                message: "Something went wrong!",
            });
        }
    }
    async login(req, res) {
        const loginDto = req.body;
        const user = await this.userRepository.findOne({ where: { email: loginDto.email }, select: ["id", "firstName", "lastName", "email", "password", "role"] });
        if (!user || !(await this.comparePassword(loginDto.password, user.password)))
            return res.status(403).json({
                status: 403,
                message: "Invalid email or password",
            });
        const { password, ...result } = user;
        const accessToken = jsonwebtoken_1.default.sign({
            ...result,
        }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({
            access_token: accessToken,
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map