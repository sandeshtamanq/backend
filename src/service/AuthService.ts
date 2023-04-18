import { Request, Response } from "express";
import { UserEntity } from "../models/entities/UserEntity";
import { RegisterDto } from "../models/dto/RegisterDto";
import { AppDataSource } from "../typeorm/typeorm.connection";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginDto } from "../models/dto/LoginDto";

export class AuthService {
  private userRepository = AppDataSource.getRepository(UserEntity);

  /**
   *
   * @param password
   * @returns hashed password
   */
  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  /**
   *
   * @param password
   * @param hashPassword
   * @returns true if user input password and hashed password in the db is matched
   */
  private comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  /**
   * @method post
   * @description user registration function
   * @param req
   * @param res
   *
   */
  async register(req: Request, res: Response) {
    const registerDto: RegisterDto = req.body;
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
    } catch (err) {
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

  /**
   * @method post
   * @description user login function
   * @param req
   * @param res
   * @returns jwt access token
   */
  async login(req: Request, res: Response) {
    const loginDto: LoginDto = req.body;
    const user: UserEntity | null = await this.userRepository.findOne({ where: { email: loginDto.email }, select: ["id", "firstName", "lastName", "email", "password", "role"] });
    if (!user || !(await this.comparePassword(loginDto.password, user.password)))
      return res.status(403).json({
        status: 403,
        message: "Invalid email or password",
      });

    const { password, ...result } = user;

    const accessToken: string = jwt.sign(
      {
        ...result,
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      access_token: accessToken,
    });
  }
}
