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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDelete = exports.usuariosPost = exports.usuariosPut = exports.usuariosGet = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = require("../models/usuario");
const usuariosGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { estado: true };
    const { limite = 5, desde = 0 } = req.query;
    // const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limite));
    // const total=await Usuario.countDocuments(query);
    const [total, usuarios] = yield Promise.all([
        usuario_1.Usuario.countDocuments(query),
        usuario_1.Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);
    res.status(200).json({ total, usuarios });
});
exports.usuariosGet = usuariosGet;
const usuariosPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, password, google, correo } = _a, resto = __rest(_a, ["_id", "password", "google", "correo"]);
    //TODO validar contra bbdd
    if (password) {
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(req.body.password, salt);
    }
    const usuario = yield usuario_1.Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario);
});
exports.usuariosPut = usuariosPut;
const usuariosPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const usuario = new usuario_1.Usuario(body);
    const { email } = usuario;
    //Encriptar contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.password = bcryptjs_1.default.hashSync(usuario.password, salt);
    //Guardar en BBDD
    yield usuario.save();
    res.json({
        msg: 'Post',
        usuario
    });
});
exports.usuariosPost = usuariosPost;
const usuariosDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const uid = req.uid;
    const usuarioAutenticado = req.usuario;
    //Borrado de la base de datos.
    //const usuarioBorrado = await Usuario.findByIdAndDelete(id);
    //Cambiamos el estado del usuario.
    const usuarioBorrado = yield usuario_1.Usuario.findByIdAndUpdate(id, { estado: false });
    // if (usuarioBorrado)
    // {
    //     usuarioBorrado.estado=false;
    //     Usuario.findByIdAndUpdate(id,usuarioBorrado);
    // }
    res.json({
        usuarioBorrado
    });
});
exports.usuariosDelete = usuariosDelete;
//# sourceMappingURL=usuarios.controller.js.map