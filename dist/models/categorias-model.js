"use strict";
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
exports.Categoria = exports.categoriaSchema = void 0;
const mongoose_1 = require("mongoose");
exports.categoriaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});
exports.categoriaSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id, estado } = _a, categoria = __rest(_a, ["__v", "_id", "estado"]);
    categoria.uid = _id;
    return categoria;
};
exports.Categoria = mongoose_1.model('Categoria', exports.categoriaSchema);
//# sourceMappingURL=categorias-model.js.map