"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.roleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.roleSchema = new mongoose_1.Schema({
    rol: {
        type: String,
        required: [true, 'El role es obligatorio.']
    }
});
exports.Role = mongoose_1.model('Role', exports.roleSchema);
//# sourceMappingURL=role.js.map