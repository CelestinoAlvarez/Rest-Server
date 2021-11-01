
import express from "express";
import cors from "cors";
import { dbConnection } from "../db/config.db";


export class Server{
    app: any;
    port: string | undefined;
    usuariosPath: string='';
    authPath: string;

    constructor(){
        this.app=express();
        this.port = process.env.PORT;

        

        //Conectar a la BBDD
        this.conectarDB();
        
        //Rutas del API
        this.usuariosPath='/api/usuarios';
        this.authPath='/api/auth';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
       
    }

    routes(){
       this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));
       this.app.use(this.authPath, require('../routes/auth.routes'));
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
    }

    async conectarDB(){
        await dbConnection();
    }
}