"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const ormconfig_1 = require("./ormconfig");
require("reflect-metadata");
exports.AppDataSource = new typeorm_1.DataSource(ormconfig_1.ormConfig);
const dbConnection = async () => {
    return exports.AppDataSource.initialize();
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=typeorm.connection.js.map