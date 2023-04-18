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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserEntity_1 = require("../models/entities/UserEntity");
const typeorm_connection_1 = require("../typeorm/typeorm.connection");
class UserService {
    constructor() {
        this.userRepository = typeorm_connection_1.AppDataSource.getRepository(UserEntity_1.UserEntity);
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userList = yield this.userRepository.find();
            return res.status(200).json({
                users: userList,
            });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            yield this.userRepository.update(userId, req.body);
            const updateUser = yield this.userRepository.findOne({ where: { id: userId } });
            return res.status(200).json({
                status: 200,
                user: updateUser,
            });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                yield this.userRepository.delete(userId);
                return res.status(200).json({
                    status: 200,
                    message: "User deleted successfully",
                });
            }
            catch (err) {
                return res.json({
                    message: "Something went wrong",
                });
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map