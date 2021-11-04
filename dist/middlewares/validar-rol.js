"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRole = exports.esAdminRole = void 0;
const esAdminRole = (req, rep, next) => {
    if (!req.usuario) {
        return rep.status(500).json({
            msg: "Se quiere validar el role antes del token"
        });
    }
    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return rep.status(401).json({
            msg: `${nombre} no es administrador.`
        });
    }
    next();
};
exports.esAdminRole = esAdminRole;
const tieneRole = (...roles) => {
    return (req, rep, next) => {
        console.log(roles);
        if (!(req.usuario.rol in roles)) {
            return rep.status(400).json({
                msg: `No tiene ninguno de estos roles ${roles}`,
            });
        }
        next();
    };
};
exports.tieneRole = tieneRole;
//# sourceMappingURL=validar-rol.js.map