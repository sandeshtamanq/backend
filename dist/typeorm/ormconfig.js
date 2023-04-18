"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
require("dotenv").config();
exports.ormConfig = {
    type: "postgres",
    url: process.env.DB_URL,
    entities: ["dist/models/entities/*.js"],
    logging: false,
    synchronize: true,
};
//# sourceMappingURL=ormconfig.js.map