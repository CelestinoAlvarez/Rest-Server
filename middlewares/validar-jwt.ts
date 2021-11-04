import { Request, Response } from "express";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import { userPayload } from "../helpers/generar-JWT";
import { Usuario, usuario } from "../models/usuario";

declare global {
    namespace Express {
      interface Request {
        uid: string,
        usuario:usuario
      }
    }
  }

export const validarJWT= async (req:Request,res:Response, next:()=> void)=>{
    const token=req.header('x-token');
   
    if(!token){
        return res.status(401).json({
            msg:"No hay token en la petición"
        })
    }
    
    try {
          const payload =  jwt.verify(token,process.env.SECRETKEY!);
          const pay=jwt.decode(token) as userPayload;
          
          req.uid=pay.uid;

          const usuarioAutenticado= await Usuario.findById(req.uid) as usuario;

          if(!usuarioAutenticado){
            return res.status(401).json({
                msg:"Token no válido - usuario inexistente"
            })  
          }

          //Verificar si el usuario tiene el estado en true.
          if (!usuarioAutenticado.estado){
            return res.status(401).json({
                msg:"Token no válido - usuario con estado false"
            })
          };

          req.usuario=usuarioAutenticado;
     
            next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"Token no válido"
        })
     
    }
}