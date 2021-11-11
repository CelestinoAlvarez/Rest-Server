
import { Resolver } from "dns";
import { Request, Response } from "express";
import { Categoria } from "../models/categorias-model";
import { Producto } from "../models/producto-model";

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
 
 //Verificar si existe la categoría
 export const existeCategoria=async (id='')=>{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`La categoría con el id ${id} no existe`);
        }
    }
 
//Verificar si existe el producto
 export const existeProducto=async (id='')=>{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El producto con el id ${id} no existe`);
        }
    }
 

//Validar coleccines permitidas
export const coleccionesPermitidas=(coleccion:string,colecciones:string[])=>{
    const incluida=colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La colección ${coleccion} no está permitida.`)
    }

    return true;
}