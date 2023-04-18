"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const TaskEntity_1 = require("../models/entities/TaskEntity");
const typeorm_connection_1 = require("../typeorm/typeorm.connection");
class TaskService {
    taskRepository = typeorm_connection_1.AppDataSource.getRepository(TaskEntity_1.TaskEntity);
    async addTask(req, res) {
        const taskDto = req.body;
        const user = req.user;
        const newTask = this.taskRepository.create({
            taskName: taskDto.title,
            description: taskDto.description,
            userId: user?.id,
        });
        const savedTask = await this.taskRepository.save(newTask);
        return res.status(201).json({
            status: 201,
            task: savedTask,
        });
    }
    async getTask(req, res) {
        const user = req.user;
        const tasks = await this.taskRepository.find({
            where: { userId: user?.id },
            order: {
                id: "DESC",
            },
        });
        return res.status(200).json({
            status: 200,
            tasks,
        });
    }
    async updateTask(req, res) {
        const taskId = Number(req.params.id);
        const taskDetail = req.body;
        await this.taskRepository.update(taskId, taskDetail);
        const updatedTask = await this.taskRepository.findOne({ where: { id: taskId } });
        return res.status(200).json({
            status: 200,
            task: updatedTask,
        });
    }
    async deleteTask(req, res) {
        const taskId = Number(req.params.id);
        await this.taskRepository.delete(taskId);
        return res.status(202).json({
            status: 202,
            message: "Task deleted successfully!",
        });
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=TaskService.js.map