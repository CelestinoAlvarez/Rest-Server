"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = express_1.Router();
exports.router.get('/', (req, res) => {
    res.json({
        msg: "GEt"
    });
});
exports.router.put('/', (req, res) => {
    res.json({
        msg: "PUT"
    });
});
exports.router.post('/', (req, res) => {
    res.json({
        msg: "POST"
    });
});
exports.router.delete('/', (req, res) => {
    res.json({
        msg: "DELETE"
    });
});
module.exports = exports.router;
//# sourceMappingURL=user.routes.js.map