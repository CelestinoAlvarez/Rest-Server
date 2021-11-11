"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coleccionesPermitidas = exports.existeProducto = exports.existeCategoria = exports.existeUsuarioPorId = exports.existeEmail = exports.esRolValido = void 0;
const categorias_model_1 = require("../models/categorias-model");
const producto_model_1 = require("../models/producto-model");
const role_1 = require("../models/role");
const usuario_1 = require("../models/usuario");
const esRolValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRole = yield role_1.Role.findOne({ "rol": rol });
    if (!existeRole) {
        throw new Error(`El role ${rol} no está registrado`);
    }
});
exports.esRolValido = esRolValido;
//Verificar si el correo existe
const existeEmail = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const duplicadoEmail = yield usuario_1.Usuario.findOne({ "email": email });
    if (duplicadoEmail) {
        throw new Error(`El email ${email} está duplicado`);
    }
});
exports.existeEmail = existeEmail;
//Verificar si el correo existe
const existeUsuarioPorId = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield usuario_1.Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id especificado no existe`);
    }
});
exports.existeUsuarioPorId = existeUsuarioPorId;
//Verificar si existe la categoría
const existeCategoria = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeCategoria = yield categorias_model_1.Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoría con el id ${id} no existe`);
    }
});
exports.existeCategoria = existeCategoria;
//Verificar si existe el producto
const existeProducto = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeProducto = yield producto_model_1.Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El producto con el id ${id} no existe`);
    }
});
exports.existeProducto = existeProducto;
//Validar coleccines permitidas
const coleccionesPermitidas = (coleccion, colecciones) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no está permitida.`);
    }
    return true;
};
exports.coleccionesPermitidas = coleccionesPermitidas;
//# sourceMappingURL=db-validators.js.map