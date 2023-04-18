"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserEntity_1 = require("../models/entities/UserEntity");
const typeorm_connection_1 = require("../typeorm/typeorm.connection");
class UserService {
    userRepository = typeorm_connection_1.AppDataSource.getRepository(UserEntity_1.UserEntity);
    async getUsers(req, res) {
        const userList = await this.userRepository.find();
        return res.status(200).json({
            users: userList,
        });
    }
    async updateUser(req, res) {
        const userId = parseInt(req.params.id);
        await this.userRepository.update(userId, req.body);
        const updateUser = await this.userRepository.findOne({ where: { id: userId } });
        return res.status(200).json({
            status: 200,
            user: updateUser,
        });
    }
    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            await this.userRepository.delete(userId);
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
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map