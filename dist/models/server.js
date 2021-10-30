"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.usuariosPath = '';
        this.app = express_1.default();
        this.port = process.env.PORT;
        //Rutas del API
        this.usuariosPath = '/api/usuarios';
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));
    }
    listen() {
        this.app.listen(this.port);
    }
    middlewares() {
        //CORS
        this.app.use(cors_1.default());
        //Lectura y parseo del body
        this.app.use(express_1.default.json());
        //Directorio público
        this.app.use(express_1.default.static('public'));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map