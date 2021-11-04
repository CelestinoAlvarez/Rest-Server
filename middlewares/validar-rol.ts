import { Request, Response } from "express";

export const esAdminRole=(req:Request, rep:Response, next:()=>void)=>{

    if(!req.usuario){
        return rep.status(500).json({
            msg:"Se quiere validar el role antes del token"
        })
    }

    const {rol,nombre}=req.usuario;

    if(rol!=='ADMIN_ROLE'){
        return rep.status(401).json({
            msg:`${nombre} no es administrador.`
        })
    }


    next();
}

export const tieneRole=( ...roles:string[] )=>{

    return (req:Request, rep:Response, next:()=>void)=>{
        console.log(roles);
        if(!(req.usuario.rol in roles)){
            return rep.status(400).json({
                msg:`No tiene ninguno de estos roles ${roles}`,
            });
        }
        next();
    }
}