import { Request, Response } from "express";
import { TaskEntity } from "../models/entities/TaskEntity";
import { AppDataSource } from "../typeorm/typeorm.connection";
import { TaskDto } from "../models/dto/TaskDto";

export class TaskService {
  private taskRepository = AppDataSource.getRepository(TaskEntity);

  /**
   * @method get
   * @param req
   * @param res
   * @returns added task
   */
  async addTask(req: Request, res: Response) {
    const taskDto: TaskDto = req.body;
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

  /**
   * @method post
   * @param req
   * @param res
   * @returns list of task of the requested user
   */
  async getTask(req: Request, res: Response) {
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

  /**
   * @method patch
   * @param req
   * @param res
   * @returns updated task
   */
  async updateTask(req: Request, res: Response) {
    const taskId: number = Number(req.params.id);
    const taskDetail = req.body;
    await this.taskRepository.update(taskId, taskDetail);
    const updatedTask = await this.taskRepository.findOne({ where: { id: taskId } });

    return res.status(200).json({
      status: 200,
      task: updatedTask,
    });
  }

  async deleteTask(req: Request, res: Response) {
    const taskId = Number(req.params.id);
    await this.taskRepository.delete(taskId);

    return res.status(202).json({
      status: 202,
      message: "Task deleted successfully!",
    });
  }
}
