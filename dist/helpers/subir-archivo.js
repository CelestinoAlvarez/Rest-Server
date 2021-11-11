"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivo = void 0;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const subirArchivo = (files, extensionesValidas = ['jpg', 'bmp', 'jpeg', 'png'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const archivo = files.archivo;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        if (!extensionesValidas.includes(extension)) {
            return reject("Fichero no permitido");
        }
        const nombreTemporal = uuid_1.v4() + '.' + extension;
        const uploadPath = path_1.default.join(__dirname, '../uploads/', carpeta, nombreTemporal);
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(nombreTemporal);
        });
    });
};
exports.subirArchivo = subirArchivo;
//# sourceMappingURL=subir-archivo.js.map