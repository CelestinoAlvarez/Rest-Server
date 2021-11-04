"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_rol_1 = require("../middlewares/validar-rol");
exports.router = express_1.Router();
exports.router.get('/', usuarios_controller_1.usuariosGet);
exports.router.put('/:id', [
    express_validator_1.check('id', 'No es un id válido').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeUsuarioPorId),
    express_validator_1.check('rol').custom(db_validators_1.esRolValido),
    validar_campos_1.validarCampos
], usuarios_controller_1.usuariosPut);
exports.router.post('/', [
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    express_validator_1.check('email', 'Correo no válido').isEmail(),
    express_validator_1.check('email').custom(db_validators_1.existeEmail),
    //check('rol','Rol no válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    express_validator_1.check('rol').custom(db_validators_1.esRolValido),
    validar_campos_1.validarCampos
], usuarios_controller_1.usuariosPost);
exports.router.delete('/:id', [
    validar_jwt_1.validarJWT,
    //esAdminRole,
    validar_rol_1.tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    express_validator_1.check('id', 'No es un id válido').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeUsuarioPorId),
    validar_campos_1.validarCampos
], usuarios_controller_1.usuariosDelete);
module.exports = exports.router;
//# sourceMappingURL=usuarios.routes.js.map