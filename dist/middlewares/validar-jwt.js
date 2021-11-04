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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = require("../models/usuario");
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRETKEY);
        const pay = jsonwebtoken_1.default.decode(token);
        req.uid = pay.uid;
        const usuarioAutenticado = yield usuario_1.Usuario.findById(req.uid);
        if (!usuarioAutenticado) {
            return res.status(401).json({
                msg: "Token no válido - usuario inexistente"
            });
        }
        //Verificar si el usuario tiene el estado en true.
        if (!usuarioAutenticado.estado) {
            return res.status(401).json({
                msg: "Token no válido - usuario con estado false"
            });
        }
        ;
        req.usuario = usuarioAutenticado;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jwt.js.map