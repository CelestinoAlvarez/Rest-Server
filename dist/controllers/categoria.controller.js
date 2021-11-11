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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriaDelete = exports.actualizarCategoria = exports.crearCategoria = exports.obtenerCategoriaPorId = exports.obtenerCategorias = void 0;
const categorias_model_1 = require("../models/categorias-model");
//Obtener categorias - paginado - total - populate
const obtenerCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cantidad = yield categorias_model_1.Categoria.count();
    const categorias = yield categorias_model_1.Categoria.find();
    const { limite = 5, desde = 0 } = req.query;
    const categoriasSeleccionadas = yield categorias_model_1.Categoria.find(req.query)
        .populate('usuario_id', "nombre")
        .skip(Number(desde))
        .limit(Number(limite));
    console.log(categoriasSeleccionadas);
    res.status(201).json({
        "total": cantidad,
        categoriasSeleccionadas
    });
});
exports.obtenerCategorias = obtenerCategorias;
//Obtener categoria - populate
const obtenerCategoriaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const busqueda = yield categorias_model_1.Categoria.findOne({ id }).populate("usuario_id", "nombre");
    console.log(busqueda);
    res.status(201).json({
        busqueda
    });
});
exports.obtenerCategoriaPorId = obtenerCategoriaPorId;
const crearCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = req.body;
    console.log(categoria);
    const nombre = categoria.nombre.toUpperCase();
    const categoriaDB = yield categorias_model_1.Categoria.findOne({ nombre });
    if (categoriaDB) {
        res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        });
    }
    //Generar datos a guardar.
    const datos = {
        nombre: nombre,
        usuario_id: req.uid
    };
    console.log(datos);
    const elemento = new categorias_model_1.Categoria(datos);
    //Guardar en DDBB
    try {
        yield elemento.save();
        res.status(201).json(elemento);
    }
    catch (error) {
        res.status(500).json({
            msg: "Error al guardar la categoria en la BBDD"
        });
    }
});
exports.crearCategoria = crearCategoria;
//Actualizar Categoria
const actualizarCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { estado, usuario_id } = _a, dato = __rest(_a, ["estado", "usuario_id"]);
    dato.nombre = dato.nombre.toUpperCase();
    dato.usuario_id = req.uid;
    const categoria = yield categorias_model_1.Categoria.findByIdAndUpdate(id, dato, { new: true });
    res.status(200).json({
        categoria
    });
});
exports.actualizarCategoria = actualizarCategoria;
//Borrar categoria
const categoriaDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const uid = req.uid;
    const categoriaAutenticado = req.usuario;
    //Borrado de la base de datos.
    //const usuarioBorrado = await Categoria.findByIdAndDelete(id);
    //Cambiamos el estado del usuario.
    const categoriaBorrado = yield categorias_model_1.Categoria.findByIdAndUpdate(id, { estado: false });
    res.json({
        categoriaBorrado
    });
});
exports.categoriaDelete = categoriaDelete;
//# sourceMappingURL=categoria.controller.js.map