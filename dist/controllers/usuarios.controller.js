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
exports.usuariosDelete = exports.usuariosPost = exports.usuariosPut = exports.usuariosGet = void 0;
const usuariosGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    res.status(200).json({
        'msg': "Get - controller",
        'query': query
    });
});
exports.usuariosGet = usuariosGet;
const usuariosPut = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "PUT - controller",
        id
    });
};
exports.usuariosPut = usuariosPut;
const usuariosPost = (req, res) => {
    const body = req.body;
    res.json(body);
};
exports.usuariosPost = usuariosPost;
const usuariosDelete = (req, res) => {
    res.json({
        msg: "DELETE"
    });
};
exports.usuariosDelete = usuariosDelete;
//# sourceMappingURL=usuarios.controller.js.map