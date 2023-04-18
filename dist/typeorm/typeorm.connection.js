"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const ormconfig_1 = require("./ormconfig");
require("reflect-metadata");
exports.AppDataSource = new typeorm_1.DataSource(ormconfig_1.ormConfig);
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    return exports.AppDataSource.initialize();
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=typeorm.connection.js.map