"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const uploads_controller_1 = require("../controllers/uploads.controller");
const db_validators_1 = require("../helpers/db-validators");
const validar_archivo_1 = require("../middlewares/validar-archivo");
const validar_campos_1 = require("../middlewares/validar-campos");
exports.router = express_1.Router();
exports.router.post('/', validar_archivo_1.validarArchivo, uploads_controller_1.cargarArchivo);
exports.router.put('/:coleccion/:id', [
    express_validator_1.check('id', 'El id deber ser de Mongo').isMongoId(),
    express_validator_1.check('coleccion', "Debe estan dentro de los tipos permitidos").custom(c => db_validators_1.coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validar_campos_1.validarCampos
], uploads_controller_1.actualizarImagenCloudinary);
exports.router.get('/:coleccion/:id', [
    express_validator_1.check('id', 'El id deber ser de Mongo').isMongoId(),
    express_validator_1.check('coleccion', "Debe estan dentro de los tipos permitidos").custom(c => db_validators_1.coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validar_campos_1.validarCampos
], uploads_controller_1.mostrarImagen);
module.exports = exports.router;
//# sourceMappingURL=uploads.routes.js.map