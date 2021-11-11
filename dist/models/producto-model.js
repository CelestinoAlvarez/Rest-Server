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
exports.Producto = exports.productoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre obligatorio.'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    id_usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    id_categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
    imagen: { type: String }
});
exports.productoSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, producto = __rest(_a, ["__v", "_id"]);
    producto.uid = _id;
    return producto;
};
exports.Producto = mongoose_1.model('Producto', exports.productoSchema);
//# sourceMappingURL=producto-model.js.map