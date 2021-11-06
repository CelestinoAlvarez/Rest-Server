"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validar_campos_1 = require("../middlewares/validar-campos");
exports.router = express_1.Router();
exports.router.post('/login', [
    express_validator_1.check('email', 'El correo es obligatorio').isEmail(),
    express_validator_1.check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], auth_controller_1.login);
exports.router.post('/google', [
    express_validator_1.check('id_token', 'ID-Token es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], auth_controller_1.googleSingIn);
module.exports = exports.router;
//# sourceMappingURL=auth.routes.js.map