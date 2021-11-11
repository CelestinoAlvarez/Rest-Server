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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostrarImagen = exports.actualizarImagenCloudinary = exports.actualizarImagen = exports.cargarArchivo = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cloudinary = require('cloudinary').v2;
const subir_archivo_1 = require("../helpers/subir-archivo");
const producto_model_1 = require("../models/producto-model");
const usuario_1 = require("../models/usuario");
cloudinary.config(process.env.CLOUDINARY_URL);
const cargarArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const nombre = await subirArchivo(req.files,['txt','md','xml'],'textos');
        const nombre = yield subir_archivo_1.subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Error en subida de fichero'
        });
    }
});
exports.cargarArchivo = cargarArchivo;
const actualizarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = yield usuario_1.Usuario.findById(id);
            if (!modelo) {
                res.status(400).json({
                    msg: "No existe ese usuario"
                });
            }
            break;
        case 'productos':
            modelo = yield producto_model_1.Producto.findById(id);
            if (!modelo) {
                res.status(400).json({
                    msg: "No existe ese producto"
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: "Se me olvidó validar esto"
            });
    }
    //Limpiar imágenes previas
    if (modelo === null || modelo === void 0 ? void 0 : modelo.imagen) {
        //Hay que borrar la imagen del servidor
        const pathImagen = path_1.default.join(__dirname, '../uploads', coleccion, modelo.imagen);
        if (fs_1.default.existsSync(pathImagen)) {
            fs_1.default.unlinkSync(pathImagen);
        }
    }
    const nombre = yield subir_archivo_1.subirArchivo(req.files, undefined, coleccion);
    console.log('Nombre : ', nombre);
    modelo.imagen = nombre;
    console.log('Valor : ', modelo.imagen);
    try {
        yield modelo.save();
    }
    catch (error) {
        console.log('Error : ', error);
    }
    res.json({
        modelo
    });
});
exports.actualizarImagen = actualizarImagen;
const actualizarImagenCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = yield usuario_1.Usuario.findById(id);
            if (!modelo) {
                res.status(400).json({
                    msg: "No existe ese usuario"
                });
            }
            break;
        case 'productos':
            modelo = yield producto_model_1.Producto.findById(id);
            if (!modelo) {
                res.status(400).json({
                    msg: "No existe ese producto"
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: "Se me olvidó validar esto"
            });
    }
    //Limpiar imágenes previas
    if (modelo === null || modelo === void 0 ? void 0 : modelo.imagen) {
        const nombreImagen = modelo.imagen;
        console.log('Imagen: ', nombreImagen);
        const nombrePartido = nombreImagen.split('/');
        console.log('Imagen: ', nombrePartido);
        const nombreFichero = nombrePartido[nombrePartido.length - 1];
        console.log('Nombre Fichero: ', nombreFichero);
        const [public_id] = nombreFichero.split('.');
        console.log(public_id);
        yield cloudinary.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = yield cloudinary.uploader.upload(tempFilePath);
    const nombre = yield subir_archivo_1.subirArchivo(req.files, undefined, coleccion);
    console.log('Nombre : ', nombre);
    modelo.imagen = secure_url;
    console.log('Valor : ', modelo.imagen);
    try {
        yield modelo.save();
    }
    catch (error) {
        console.log('Error : ', error);
    }
    res.json({
        modelo
    });
});
exports.actualizarImagenCloudinary = actualizarImagenCloudinary;
const mostrarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = yield usuario_1.Usuario.findById(id);
            if (!modelo) {
                res.status(400).json({
                    msg: "No existe ese usuario"
                });
            }
            break;
        case 'productos':
            modelo = yield producto_model_1.Producto.findById(id);
            if (!modelo) {
                res.status(400).json({
                    msg: "No existe ese producto"
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: "Se me olvidó validar esto"
            });
    }
    //Limpiar imágenes previas
    if (modelo === null || modelo === void 0 ? void 0 : modelo.imagen) {
        //Hay que borrar la imagen del servidor
        const pathImagen = path_1.default.join(__dirname, '../uploads', coleccion, modelo.imagen);
        if (fs_1.default.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }
    const pathNoImg = path_1.default.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathNoImg);
});
exports.mostrarImagen = mostrarImagen;
//# sourceMappingURL=uploads.controller.js.map