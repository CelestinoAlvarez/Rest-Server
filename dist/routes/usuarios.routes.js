"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios.controller");
exports.router = express_1.Router();
exports.router.get('/', usuarios_controller_1.usuariosGet);
exports.router.put('/:id', usuarios_controller_1.usuariosPut);
exports.router.post('/', usuarios_controller_1.usuariosPost);
exports.router.delete('/', usuarios_controller_1.usuariosDelete);
module.exports = exports.router;
//# sourceMappingURL=usuarios.routes.js.map