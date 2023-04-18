"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEntity = void 0;
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("./UserEntity");
const taskStatus_1 = require("../interface/taskStatus");
let TaskEntity = class TaskEntity {
    id;
    taskName;
    description;
    status;
    userId;
    user;
    createdAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TaskEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "taskName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: taskStatus_1.taskStatus.OPEN }),
    __metadata("design:type", String)
], TaskEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", Number)
], TaskEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => UserEntity_1.UserEntity, (user) => user.task),
    __metadata("design:type", UserEntity_1.UserEntity)
], TaskEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], TaskEntity.prototype, "createdAt", void 0);
TaskEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "tasks" })
], TaskEntity);
exports.TaskEntity = TaskEntity;
//# sourceMappingURL=TaskEntity.js.map