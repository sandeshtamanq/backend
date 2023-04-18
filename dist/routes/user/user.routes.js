"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserService_1 = require("../../service/UserService");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const userRoles_1 = require("../../models/interface/userRoles");
const router = (0, express_1.Router)();
exports.userRoutes = router;
const userService = new UserService_1.UserService();
router.route("/").get((0, authMiddleware_1.roleBasedGuardMiddleware)([userRoles_1.userRoles.ADMIN]), (req, res) => userService.getUsers(req, res));
router
    .route("/:id")
    .patch((0, authMiddleware_1.roleBasedGuardMiddleware)([userRoles_1.userRoles.ADMIN, userRoles_1.userRoles.USER]), (req, res) => userService.updateUser(req, res))
    .delete((0, authMiddleware_1.roleBasedGuardMiddleware)([userRoles_1.userRoles.ADMIN, userRoles_1.userRoles.USER]), (req, res) => userService.deleteUser(req, res));
//# sourceMappingURL=user.routes.js.map