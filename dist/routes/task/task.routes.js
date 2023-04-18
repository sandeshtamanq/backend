"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const TaskService_1 = require("../../service/TaskService");
const validationMiddleware_1 = require("../../middleware/validationMiddleware");
const TaskDto_1 = require("../../models/dto/TaskDto");
const router = (0, express_1.Router)();
exports.taskRoutes = router;
const taskService = new TaskService_1.TaskService();
router
    .route("/")
    .get(authMiddleware_1.authGuardMiddleware, (req, res) => taskService.getTask(req, res))
    .post(authMiddleware_1.authGuardMiddleware, (0, validationMiddleware_1.validationMiddleware)(TaskDto_1.TaskDto), (req, res) => taskService.addTask(req, res));
router
    .route("/:id")
    .patch(authMiddleware_1.checkUserGuardMiddleware, (req, res) => taskService.updateTask(req, res))
    .delete(authMiddleware_1.checkUserGuardMiddleware, (req, res) => taskService.deleteTask(req, res));
//# sourceMappingURL=task.routes.js.map