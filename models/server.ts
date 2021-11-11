
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import { dbConnection } from "../db/config.db";



export class Server{
    app: any;
    port: string | undefined;
    usuariosPath: string='';
    authPath: string='';
    
    paths: {    auth: string; 
                buscar:string;
                categorias: string; 
                usuarios: string; 
                productos:string;
                uploads:string
             };

    constructor(){
        this.app=express();
        this.port = process.env.PORT;

        //Conectar a la BBDD
        this.conectarDB();
        
        //Rutas del API
        this.paths={
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:    '/api/uploads'
        }

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
       
    }

    routes(){
       this.app.use(this.paths.auth, require('../routes/auth.routes'));
       this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
       this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
       this.app.use(this.paths.productos, require('../routes/productos.routes'));
       this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));
       this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
    }

    listen(){
        this.app.listen(this.port);
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio público
        this.app.use(express.static('public'));
        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    async conectarDB(){
        await dbConnection();
    }
}