import { Request, Response } from "express";
import bcript  from "bcryptjs";


import { Usuario } from "../models/usuario";



export const usuariosGet = async (req:Request,res:Response)=>{
    const query = {estado:true};
    const {limite=5, desde=0}=req.query;

    // const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limite));
    // const total=await Usuario.countDocuments(query);

    const [total, usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.status(200).json({total, usuarios});
};

export const usuariosPut = async (req:Request,res:Response)=>{
    const {id}=req.params;
    const { _id, password, google, correo, ...resto}=req.body;

    //TODO validar contra bbdd
    if(password){
        const salt=bcript.genSaltSync()
        resto.password=bcript.hashSync(req.body.password,salt);    
    }

    const usuario= await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);
};

export const usuariosPost = async (req:Request,res:Response)=>{
 
    const body = req.body;
    const usuario= new Usuario(body);
    const {email}=usuario;
        
    //Encriptar contraseña
    const salt=bcript.genSaltSync()
    usuario.password=bcript.hashSync(usuario.password,salt);

    //Guardar en BBDD
    await usuario.save();
    res.json({
            msg:'Post',
            usuario
        });
};

export const usuariosDelete = async (req:Request,res:Response)=>{
    const {id}=req.params;
   
    const uid=req.uid;
    const usuarioAutenticado= req.usuario;

    //Borrado de la base de datos.
    //const usuarioBorrado = await Usuario.findByIdAndDelete(id);

    //Cambiamos el estado del usuario.
    const usuarioBorrado=await Usuario.findByIdAndUpdate(id,{estado:false});
    // if (usuarioBorrado)
    // {
    //     usuarioBorrado.estado=false;
    //     Usuario.findByIdAndUpdate(id,usuarioBorrado);
    // }
   

    res.json({
        usuarioBorrado
    });
}