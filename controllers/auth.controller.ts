import { Request, Response } from "express";
import bcript from "bcryptjs";

import { Usuario, usuario } from "../models/usuario";
import { generarJWT } from "../helpers/generar-JWT";
import { googleVerify } from "../helpers/google-verify";

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

export const googleSingIn=async(req:Request, res:Response)=>{
    const {id_token}=req.body;

    try {
        const googleUser=await googleVerify(id_token);

        console.log(googleUser);
        const {nombre, email, imagen }=googleUser;
        console.log('');
        console.log(nombre +'  -   '+email+'   -');
        
        //Comprobamos si el correo ya existe en la BBDD
        let usuario = await Usuario.findOne({email});

        if (!usuario){
            //Lo creamos
            
            const data = {
                nombre,
                email,
                imagen,
                password:'Da igual lo que se mande',
                google:true,
                rol:'VENTAS-ROLE'
            }
         
            usuario = new Usuario(data);
            console.log('Creamos el usuario', data);
       
            await usuario.save();
            console.log('Después de save', data);
       
        }
        
        //Si ya tenemos el usuario vamos a comprobar si no está bloqueado
        if(!usuario.estado){
            return res.status(401).json({
                ok:false,
                msg:"Usuario bloqueado"
            })
        }

        //Generamos el JWT

        const token = await generarJWT(usuario!._id);

        
        res.json({
            msg:'Ok Google-SignIn',
            usuario:usuario,
            id_token
        });
    } catch (error) {
        console.log(error);
        
        res.status(400).json({
            ok:false,
            msg:"El mensaje no se pudo verificar"
        });
    }

   
    
}