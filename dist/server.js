"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_connection_1 = require("./typeorm/typeorm.connection");
const auth_routes_1 = require("./routes/auth/auth.routes");
const user_routes_1 = require("./routes/user/user.routes");
const task_routes_1 = require("./routes/task/task.routes");
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
(0, typeorm_connection_1.dbConnection)()
    .then((res) => {
    app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}`));
})
    .catch((err) => console.log(err));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.authRoutes);
app.use("/api/user", user_routes_1.userRoutes);
app.use("/api/task", task_routes_1.taskRoutes);
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: "Not found",
    });
});
//# sourceMappingURL=server.js.map