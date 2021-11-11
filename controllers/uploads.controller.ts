import { Response, Request } from "express";
import fileUpload from "express-fileupload";
import { UploadedFile } from "express-fileupload";
import  fs  from "fs";
import path from "path";
const cloudinary = require('cloudinary').v2

import { subirArchivo } from "../helpers/subir-archivo";
import { validarArchivo } from "../middlewares/validar-archivo";
import { Producto, producto } from "../models/producto-model";
import { Usuario, usuario } from "../models/usuario";

cloudinary.config(process.env.CLOUDINARY_URL);


export const cargarArchivo = async (req:Request, res:Response)=>{
  
try {
  //const nombre = await subirArchivo(req.files,['txt','md','xml'],'textos');
  const nombre = await subirArchivo(req.files,undefined,'imgs');
  res.json({nombre});
} catch (error) {
  return res.status(400).json({
    msg:'Error en subida de fichero'
  })
}
  
}

export const actualizarImagen=async(req:Request,res:Response)=>{
  const {id,coleccion}=req.params;
  let modelo;

  switch(coleccion){
    case 'usuarios':

      modelo=await Usuario.findById(id);
      
      if(!modelo){
        res.status(400).json({
          msg:"No existe ese usuario"
        })
      }
      
      break;

      case 'productos':
      modelo=await Producto.findById(id);
      if(!modelo){
        res.status(400).json({
          msg:"No existe ese producto"
        })
      }
      break;

    default:

    return res.status(500).json({
      msg:"Se me olvidó validar esto"
    });
  }

  //Limpiar imágenes previas
  if(modelo?.imagen){
    //Hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen);
    if(fs.existsSync(pathImagen)){
      fs.unlinkSync(pathImagen)
    }
  }

  const nombre= await subirArchivo(req.files,undefined,coleccion);
   console.log('Nombre : ',nombre);
  modelo.imagen=nombre;

  console.log('Valor : ',modelo!.imagen);
  try {
    await modelo!.save();
  } catch (error) {
    console.log('Error : ', error);
  }


  res.json({
    modelo
  })
}

export const actualizarImagenCloudinary=async(req:Request,res:Response)=>{
  const {id,coleccion}=req.params;
  let modelo;

  switch(coleccion){
    case 'usuarios':

      modelo=await Usuario.findById(id);
      
      if(!modelo){
        res.status(400).json({
          msg:"No existe ese usuario"
        })
      }
      
      break;

      case 'productos':
      modelo=await Producto.findById(id);
      if(!modelo){
        res.status(400).json({
          msg:"No existe ese producto"
        })
      }
      break;

    default:

    return res.status(500).json({
      msg:"Se me olvidó validar esto"
    });
  }

  //Limpiar imágenes previas
  if(modelo?.imagen){
    const nombreImagen=modelo.imagen;
    console.log('Imagen: ',nombreImagen);
    const nombrePartido=nombreImagen.split('/');
    console.log('Imagen: ',nombrePartido);
    const nombreFichero=nombrePartido[nombrePartido.length-1];
    console.log('Nombre Fichero: ',nombreFichero);
    const [public_id]=nombreFichero.split('.');
    
    console.log(public_id);

    await cloudinary.uploader.destroy(public_id);
    
  }

  const {tempFilePath}=req.files!.archivo;
  const {secure_url}=await cloudinary.uploader.upload(tempFilePath);

  const nombre= await subirArchivo(req.files,undefined,coleccion);
   console.log('Nombre : ',nombre);
   modelo.imagen=secure_url;

  console.log('Valor : ',modelo!.imagen);
  try {
    await modelo!.save();
  } catch (error) {
    console.log('Error : ', error);
  }


  res.json({
    modelo
  })
}


export const mostrarImagen=async(req:Request, res:Response)=>{
  const {id,coleccion}=req.params;
  let modelo;

  switch(coleccion){
    case 'usuarios':

      modelo=await Usuario.findById(id);
      
      if(!modelo){
        res.status(400).json({
          msg:"No existe ese usuario"
        })
      }
      
      break;

      case 'productos':
      modelo=await Producto.findById(id);
      if(!modelo){
        res.status(400).json({
          msg:"No existe ese producto"
        })
      }
      break;

    default:

    return res.status(500).json({
      msg:"Se me olvidó validar esto"
    });
  }

  //Limpiar imágenes previas
  if(modelo?.imagen){
    //Hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.imagen);
    if(fs.existsSync(pathImagen)){
      return res.sendFile(pathImagen);
    }
  }

  const pathNoImg=path.join(__dirname, '../assets/no-image.jpg');
  return res.sendFile(pathNoImg);
 
}