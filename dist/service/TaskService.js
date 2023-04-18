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
exports.TaskService = void 0;
const TaskEntity_1 = require("../models/entities/TaskEntity");
const typeorm_connection_1 = require("../typeorm/typeorm.connection");
class TaskService {
    constructor() {
        this.taskRepository = typeorm_connection_1.AppDataSource.getRepository(TaskEntity_1.TaskEntity);
    }
    addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskDto = req.body;
            const user = req.user;
            const newTask = this.taskRepository.create({
                taskName: taskDto.title,
                description: taskDto.description,
                userId: user === null || user === void 0 ? void 0 : user.id,
            });
            const savedTask = yield this.taskRepository.save(newTask);
            return res.status(201).json({
                status: 201,
                task: savedTask,
            });
        });
    }
    getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const tasks = yield this.taskRepository.find({
                where: { userId: user === null || user === void 0 ? void 0 : user.id },
                order: {
                    id: "DESC",
                },
            });
            return res.status(200).json({
                status: 200,
                tasks,
            });
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskId = Number(req.params.id);
            const taskDetail = req.body;
            yield this.taskRepository.update(taskId, taskDetail);
            const updatedTask = yield this.taskRepository.findOne({ where: { id: taskId } });
            return res.status(200).json({
                status: 200,
                task: updatedTask,
            });
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskId = Number(req.params.id);
            yield this.taskRepository.delete(taskId);
            return res.status(202).json({
                status: 202,
                message: "Task deleted successfully!",
            });
        });
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=TaskService.js.map