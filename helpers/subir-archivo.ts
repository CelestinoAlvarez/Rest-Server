import { UploadedFile } from "express-fileupload";
import  { v4 as uuidv4}  from 'uuid';
import  path  from "path";


export const subirArchivo=(files:any,extensionesValidas=['jpg','bmp','jpeg','png'], carpeta:string='')=>{
 
        return new Promise((resolve, reject)=>{
           
            const archivo = files.archivo as UploadedFile ;

            const nombreCortado = archivo.name.split('.');
            const extension=nombreCortado[nombreCortado.length-1];
            
            if(!extensionesValidas.includes(extension)){
                return reject("Fichero no permitido");
            }
            
            const nombreTemporal = uuidv4()+'.'+extension;
            const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemporal);
            
            archivo.mv(uploadPath, (err: any)=> {
                if (err) {
                return reject(err);
                }
            
                resolve(nombreTemporal);
            });

        })
   
}