import { Request, Response } from "express";
import { UserEntity } from "../models/entities/UserEntity";
import { AppDataSource } from "../typeorm/typeorm.connection";

export class UserService {
  private userRepository = AppDataSource.getRepository(UserEntity);

  /**
   *
   * @param req
   * @param res
   * @returns lists of registered users
   */
  async getUsers(req: Request, res: Response) {
    const userList = await this.userRepository.find();
    return res.status(200).json({
      user: userList,
    });
  }

  /**
   *
   * @param req
   * @param res
   * @returns updated user
   */
  async updateUser(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id);
    await this.userRepository.update(userId, req.body);
    const updateUser = await this.userRepository.findOne({ where: { id: userId } });
    return res.status(200).json({
      status: 200,
      user: updateUser,
    });
  }

  /**
   *
   * @param req
   * @param res
   * @returns deletes the specifi user
   */
  async deleteUser(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      await this.userRepository.delete(userId);
      return res.status(200).json({
        status: 200,
        message: "User deleted successfully",
      });
    } catch (err) {
      return res.json({
        message: "Something went wrong",
      });
    }
  }
}
