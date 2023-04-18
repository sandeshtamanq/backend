import { Request, Response, Router } from "express";
import { UserService } from "../../service/UserService";
import { authGuardMiddleware, roleBasedGuardMiddleware } from "../../middleware/authMiddleware";
import { userRoles } from "../../models/interface/userRoles";

const router = Router();

const userService = new UserService();

router.route("/").get(roleBasedGuardMiddleware([userRoles.ADMIN]), (req: Request, res: Response) => userService.getUsers(req, res));

router
  .route("/:id")
  .patch(roleBasedGuardMiddleware([userRoles.ADMIN, userRoles.USER]), (req: Request, res: Response) => userService.updateUser(req, res))
  .delete(roleBasedGuardMiddleware([userRoles.ADMIN, userRoles.USER]), (req: Request, res: Response) => userService.deleteUser(req, res));

export { router as userRoutes };
