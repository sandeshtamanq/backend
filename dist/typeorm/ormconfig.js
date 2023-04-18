"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const path_1 = require("path");
require("dotenv").config();
exports.ormConfig = {
    type: "postgres",
    url: process.env.DB_URL,
    entities: [(0, path_1.join)(__dirname, "**", "*.entity.{ts,js}")],
    logging: false,
    synchronize: true,
};
//# sourceMappingURL=ormconfig.js.map