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
exports.buscar = void 0;
const mongoose_1 = require("mongoose");
const categorias_model_1 = require("../models/categorias-model");
const producto_model_1 = require("../models/producto-model");
const usuario_1 = require("../models/usuario");
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'roles',
    'productos'
];
const buscarUsuarios = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoId = mongoose_1.isValidObjectId(termino);
    if (esMongoId) {
        const usuario = yield usuario_1.Usuario.findById(termino);
        res.json(usuario);
    }
    const resexp = new RegExp(termino, 'i');
    const usuarios = yield usuario_1.Usuario.find({
        $or: [{ nombre: resexp }, { email: resexp }],
        $and: [{ estado: true }]
    });
    res.json(usuarios);
});
const buscarCategorias = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoId = mongoose_1.isValidObjectId(termino);
    if (esMongoId) {
        const categoria = yield categorias_model_1.Categoria.findById(termino);
        res.json(categoria);
    }
    const resexp = new RegExp(termino, 'i');
    const categorias = yield categorias_model_1.Categoria.find({
        $or: [{ nombre: resexp }],
        $and: [{ estado: true }]
    });
    res.json(categorias);
});
const buscarProductos = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoId = mongoose_1.isValidObjectId(termino);
    if (esMongoId) {
        const producto = yield producto_model_1.Producto.findById(termino);
        res.json(producto);
    }
    const resexp = new RegExp(termino, 'i');
    const productos = yield producto_model_1.Producto.find({
        $or: [{ nombre: resexp }],
        $and: [{ estado: true }]
    });
    res.json(productos);
});
const buscar = (req, res) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas con ${coleccionesPermitidas}`
        });
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: "Se me olvidó hacer esta búsqueda",
            });
    }
};
exports.buscar = buscar;
//# sourceMappingURL=buscar.controller.js.map