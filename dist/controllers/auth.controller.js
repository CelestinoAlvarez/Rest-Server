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
exports.googleSingIn = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = require("../models/usuario");
const generar_JWT_1 = require("../helpers/generar-JWT");
const google_verify_1 = require("../helpers/google-verify");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //Verificar si el email existe
        const user = yield usuario_1.Usuario.findOne({ email });
        const usuario = user;
        if (!user) {
            return res.status(400).json({
                msg: "Usuario o paswword no válidos - usuario"
            });
        }
        //Verificar si el usuario está activo en la bbdd
        if (!(usuario.estado)) {
            return res.status(400).json({
                msg: "El usuario no está dado de alta"
            });
        }
        //Verificar la contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario o paswword no válidos - password"
            });
        }
        //Generar el JWT
        const token = yield generar_JWT_1.generarJWT(usuario._id);
        res.json({
            msg: 'login',
            usuario,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Error, hable con el administrador"
        });
    }
});
exports.login = login;
const googleSingIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const googleUser = yield google_verify_1.googleVerify(id_token);
        console.log(googleUser);
        const { nombre, email, imagen } = googleUser;
        console.log('');
        console.log(nombre + '  -   ' + email + '   -');
        //Comprobamos si el correo ya existe en la BBDD
        let usuario = yield usuario_1.Usuario.findOne({ email });
        if (!usuario) {
            //Lo creamos
            const data = {
                nombre,
                email,
                imagen,
                password: 'Da igual lo que se mande',
                google: true,
                rol: 'VENTAS-ROLE'
            };
            usuario = new usuario_1.Usuario(data);
            console.log('Creamos el usuario', data);
            yield usuario.save();
            console.log('Después de save', data);
        }
        //Si ya tenemos el usuario vamos a comprobar si no está bloqueado
        if (!usuario.estado) {
            return res.status(401).json({
                ok: false,
                msg: "Usuario bloqueado"
            });
        }
        //Generamos el JWT
        const token = yield generar_JWT_1.generarJWT(usuario._id);
        res.json({
            msg: 'Ok Google-SignIn',
            usuario: usuario,
            id_token
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "El mensaje no se pudo verificar"
        });
    }
});
exports.googleSingIn = googleSingIn;
//# sourceMappingURL=auth.controller.js.map