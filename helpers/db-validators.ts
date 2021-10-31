
import { Resolver } from "dns";
import { Request, Response } from "express";

import { Role } from "../models/role";
import { Usuario } from "../models/usuario";


export const esRolValido=async (rol='')=>{   
    const existeRole=await Role.findOne({"rol":rol});
    if (!existeRole){
        throw new Error(`El role ${rol} no está registrado`);
    }
}

 //Verificar si el correo existe
 export const existeEmail=async (email='')=>{
    const duplicadoEmail = await Usuario.findOne({"email":email});
    if(duplicadoEmail){
        throw new Error(`El email ${email} está duplicado`);
        }
    }
 
 //Verificar si el correo existe
 export const existeUsuarioPorId=async (id='')=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id especificado no existe`);
        }
    }
 
