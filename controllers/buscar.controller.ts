import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Categoria } from "../models/categorias-model";
import { Producto } from "../models/producto-model";
import { Usuario } from "../models/usuario";


const coleccionesPermitidas=[
    'usuarios',
    'categorias',
    'roles',
    'productos'
]

const buscarUsuarios = async (termino:string='', res:Response)=>{
    const esMongoId = isValidObjectId(termino);

    if ( esMongoId ){
        const usuario = await Usuario.findById(termino);
        res.json(
            usuario
        );
    }

    const resexp=new RegExp(termino, 'i');

    const usuarios= await Usuario.find({
        $or:[{nombre:resexp},{email:resexp}],
        $and:[{estado:true}]
    });

    res.json(
        usuarios
    );
}

const buscarCategorias = async (termino:string='', res:Response)=>{
    const esMongoId = isValidObjectId(termino);

    if ( esMongoId ){
        const categoria = await Categoria.findById(termino);
        res.json(
            categoria
        );
    }

    const resexp=new RegExp(termino, 'i');

    const categorias= await Categoria.find({
        $or:[{nombre:resexp}],
        $and:[{estado:true}]
    });

    res.json(
        categorias
    );
}


const buscarProductos = async (termino:string='', res:Response)=>{
    const esMongoId = isValidObjectId(termino);

    if ( esMongoId ){
        const producto = await Producto.findById(termino);
        res.json(
            producto
        );
    }

    const resexp=new RegExp(termino, 'i');

    const productos= await Producto.find({
        $or:[{nombre:resexp}],
        $and:[{estado:true}]
    });

    res.json(
        productos
    );
}


export const buscar = (req:Request, res:Response)=>{

    const {coleccion, termino}=req.params;

    if (!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas con ${coleccionesPermitidas}`
        })
    }

    switch (coleccion){
        case 'usuarios':
                buscarUsuarios(termino, res);
            break;
        

        case 'categorias':
                buscarCategorias(termino, res);
            break;
        

        case 'productos':
                buscarProductos(termino, res);
            break;

        default:
            res.status(500).json({
                msg:"Se me olvidó hacer esta búsqueda",
            })
    }
}