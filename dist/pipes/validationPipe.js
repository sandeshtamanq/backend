"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationPipe = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
__exportStar(require("class-validator"), exports);
const validationPipe = async (schema, requestObject) => {
    const transformedClass = (0, class_transformer_1.plainToInstance)(schema, requestObject);
    const errors = await (0, class_validator_1.validate)(transformedClass);
    if (errors.length > 0) {
        return errors;
    }
    return true;
};
exports.validationPipe = validationPipe;
//# sourceMappingURL=validationPipe.js.map