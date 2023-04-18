"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
require("dotenv").config();
exports.ormConfig = {
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE_NAME,
    entities: ["src/models/entities/*.ts"],
    logging: false,
    synchronize: true,
};
//# sourceMappingURL=ormconfig.js.map