import { Response, Request } from "express";

export const validarArchivo=(req:Request, res:Response, next: () => void)=>{
if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
    res.status(400).json({msg:'No hay archivos para subir.'});
    return;
  }
  next();
}