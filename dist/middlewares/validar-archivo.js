"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarArchivo = void 0;
const validarArchivo = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos para subir.' });
        return;
    }
    next();
};
exports.validarArchivo = validarArchivo;
//# sourceMappingURL=validar-archivo.js.map