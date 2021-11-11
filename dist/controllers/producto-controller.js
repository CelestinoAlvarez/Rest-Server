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
exports.productoDelete = exports.actualizarProducto = exports.crearProducto = exports.obtenerProductoPorId = exports.obtenerProductos = void 0;
const producto_model_1 = require("../models/producto-model");
//Obtener los productos
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { estado: true };
    const { limite = 5, desde = 0 } = req.query;
    // const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limite));
    // const total=await Usuario.countDocuments(query);
    const [total, productos] = yield Promise.all([
        producto_model_1.Producto.countDocuments(query),
        producto_model_1.Producto.find(query).skip(Number(desde)).limit(Number(limite))
    ]);
    res.status(200).json({ total, productos });
});
exports.obtenerProductos = obtenerProductos;
//Obtener producto - populate
const obtenerProductoPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const busqueda = yield producto_model_1.Producto.findOne({ id }).populate("id_usuario", "nombre").populate("id_categoria", "nombre");
    console.log(busqueda);
    res.status(201).json({
        busqueda
    });
});
exports.obtenerProductoPorId = obtenerProductoPorId;
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const producto = req.body;
    const nombre = producto.nombre.toUpperCase();
    const productoDB = yield producto_model_1.Producto.findOne({ nombre });
    if (productoDB) {
        res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }
    //Generar datos a guardar.
    const datos = {
        nombre: nombre,
        id_usuario: req.uid,
        precio: producto.precio,
        id_categoria: producto.id_categoria,
        descripcion: producto.descripcion
    };
    console.log("Datos: ", datos);
    const elemento = new producto_model_1.Producto(datos);
    //Guardar en DDBB
    try {
        yield elemento.save();
        res.status(201).json(elemento);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al guardar el producto en la BBDD"
        });
    }
});
exports.crearProducto = crearProducto;
//Actualizar Producto
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { estado, id_usuario } = _a, dato = __rest(_a, ["estado", "id_usuario"]);
    dato.nombre = dato.nombre.toUpperCase();
    dato.usuario_id = req.uid;
    const producto = yield producto_model_1.Producto.findByIdAndUpdate(id, dato, { new: true });
    res.status(200).json({
        producto
    });
});
exports.actualizarProducto = actualizarProducto;
//Borrar producto
const productoDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const uid = req.uid;
    const productoAutenticado = req.usuario;
    //Borrado de la base de datos.
    //const usuarioBorrado = await Categoria.findByIdAndDelete(id);
    //Cambiamos el estado del usuario.
    const productoBorrado = yield producto_model_1.Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json({
        productoBorrado
    });
});
exports.productoDelete = productoDelete;
//# sourceMappingURL=producto-controller.js.map