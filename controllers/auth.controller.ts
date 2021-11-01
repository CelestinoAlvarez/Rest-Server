import { Request, Response } from "express";
import bcript from "bcryptjs";

import { Usuario, usuario } from "../models/usuario";
import { generarJWT } from "../helpers/generar-JWT";

export const login= async (req:Request, res:Response)=>{

    const {email, password}=req.body;

    try {
         //Verificar si el email existe
        const user = await  Usuario.findOne({email});
        const usuario = user;
    
        if(!user){
            return res.status(400).json({
                msg:"Usuario o paswword no válidos - usuario"
            });
        }
        
        //Verificar si el usuario está activo en la bbdd
        if (!(usuario!.estado)){
            return res.status(400).json({
                msg:"El usuario no está dado de alta"
            });
        }

        //Verificar la contraseña
        const validPassword=bcript.compareSync(password, usuario!.password);
        if(!validPassword){
            return res.status(400).json({
                msg:"Usuario o paswword no válidos - password"
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario!._id);
        
        res.json({
            msg:'login',
            usuario,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg:"Error, hable con el administrador"
        })
    }

    
}