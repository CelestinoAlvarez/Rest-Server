import { CONNREFUSED } from "dns";
import mongoose from "mongoose";


export const dbConnection = async ()=>{

    //mongoose.connect(process.env.MONGO_DB_CC);

    // mongoose
    // .connect(process.env.MONGO_DB_CC)
    // .then(()=> console.log('base de datos ONLINE'))
    // .catch(err => console.log('No se pudo conectar',err));
    try {
        mongoose.connect(process.env.MONGO_DB_CC!);
        console.log('Conectado');
        
    } catch (error) {
        console.log('Error de conexión'); 
    }
    
}