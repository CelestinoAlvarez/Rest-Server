"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const db_validators_1 = require("../helpers/db-validators");
const validar_rol_1 = require("../middlewares/validar-rol");
const producto_controller_1 = require("../controllers/producto-controller");
exports.router = express_1.Router();
//{{url}}/api/categorias
//Obtener todas las categorías. PUBLICO
exports.router.get('/', producto_controller_1.obtenerProductos);
//Obtener una categoría por id. PUBLICO
exports.router.get('/:id', [
    express_validator_1.check('id', "No es un id válido").isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeProducto),
    validar_campos_1.validarCampos
], producto_controller_1.obtenerProductoPorId);
//Crear categoría - PRIVADO cualquier persona con token válido
exports.router.post('/', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], producto_controller_1.crearProducto);
//Actualizar registro por id - PRIVADO cualquier persona con token válido
exports.router.put('/:id', [
    validar_jwt_1.validarJWT,
    express_validator_1.check('id', "No es un id válido").isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeProducto),
    express_validator_1.check("nombre", "Debe introducir un nombre").not().isEmpty(),
    validar_campos_1.validarCampos
], producto_controller_1.actualizarProducto);
//Borrar categoría - PRIVADO necesario usuario ADMIN
exports.router.delete('/:id', [
    validar_jwt_1.validarJWT,
    validar_rol_1.esAdminRole,
    express_validator_1.check('id', "No es un id válido").isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.existeProducto),
    validar_campos_1.validarCampos
], producto_controller_1.productoDelete);
module.exports = exports.router;
//# sourceMappingURL=productos.routes.js.map