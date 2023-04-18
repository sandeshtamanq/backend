"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const validationPipe_1 = require("../pipes/validationPipe");
const validationMiddleware = (validationSchema) => async (req, res, next) => {
    const results = await (0, validationPipe_1.validationPipe)(validationSchema, { ...req.body, ...req.params });
    if (results.length > 0) {
        let errors = [];
        results.forEach((result) => {
            const error = result.constraints;
            errors = [...errors, ...Object.values(error)];
        });
        return res.status(400).json({
            status: 400,
            message: errors,
        });
    }
    next();
    return true;
};
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validationMiddleware.js.map