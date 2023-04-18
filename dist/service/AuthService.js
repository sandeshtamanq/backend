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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
    constructor() {
        this.userRepository = typeorm_connection_1.AppDataSource.getRepository(UserEntity_1.UserEntity);
    }
    hashPassword(password) {
        return bcrypt.hash(password, 12);
    }
    comparePassword(password, hashPassword) {
        return bcrypt.compare(password, hashPassword);
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerDto = req.body;
            const hashedPassword = yield this.hashPassword(registerDto.password);
            const newUser = this.userRepository.create({
                email: registerDto.email,
                firstName: registerDto.firstName,
                lastName: registerDto.lastName,
                password: hashedPassword,
            });
            try {
                yield this.userRepository.save(newUser);
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
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginDto = req.body;
            const user = yield this.userRepository.findOne({ where: { email: loginDto.email }, select: ["id", "firstName", "lastName", "email", "password", "role"] });
            if (!user || !(yield this.comparePassword(loginDto.password, user.password)))
                return res.status(403).json({
                    status: 403,
                    message: "Invalid email or password",
                });
            const { password } = user, result = __rest(user, ["password"]);
            const accessToken = jsonwebtoken_1.default.sign(Object.assign({}, result), process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            return res.status(200).json({
                access_token: accessToken,
            });
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map