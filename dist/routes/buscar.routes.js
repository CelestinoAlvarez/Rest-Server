"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const buscar_controller_1 = require("../controllers/buscar.controller");
exports.router = express_1.Router();
exports.router.get('/:coleccion/:termino', buscar_controller_1.buscar);
module.exports = exports.router;
//# sourceMappingURL=buscar.routes.js.map