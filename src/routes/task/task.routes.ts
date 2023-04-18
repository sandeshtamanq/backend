import { Request, Response, Router } from "express";
import { authGuardMiddleware, checkUserGuardMiddleware } from "../../middleware/authMiddleware";
import { TaskService } from "../../service/TaskService";
import { validationMiddleware } from "../../middleware/validationMiddleware";
import { TaskDto } from "../../models/dto/TaskDto";

const router = Router();

const taskService = new TaskService();
router
  .route("/")
  .get(authGuardMiddleware, (req: Request, res: Response) => taskService.getTask(req, res))
  .post(authGuardMiddleware, validationMiddleware(TaskDto), (req: Request, res: Response) => taskService.addTask(req, res));

router
  .route("/:id")
  .patch(checkUserGuardMiddleware, (req: Request, res: Response) => taskService.updateTask(req, res))
  .delete(checkUserGuardMiddleware, (req: Request, res: Response) => taskService.deleteTask(req, res));

export { router as taskRoutes };
