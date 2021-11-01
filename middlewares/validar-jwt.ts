import { Request, Response } from "express";
import  jwt  from "jsonwebtoken";


export const validarJWT=(req:Request,res:Response, next:()=> void)=>{
    const token=req.header('x-token');
   
    if(!token){
        return res.status(401).json({
            msg:"No hay token en la petición"
        })
    }
    
    try {
            jwt.verify(token,process.env.SECRETKEY!);

            next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"Token no válido"
        })
     
    }
}