import { Request, Response } from "express";
import { categoria, Categoria } from "../models/categorias-model";
import {usuario, Usuario} from "../models/usuario";



//Obtener categorias - paginado - total - populate
export const obtenerCategorias= async(req:Request,res:Response)=>{
   
    const cantidad = await Categoria.count();
    const categorias= await Categoria.find();
    const {limite=5, desde=0}=req.query;
    
    const categoriasSeleccionadas = await Categoria.find(req.query)
                                                    .populate('usuario_id',"nombre")
                                                    .skip(Number(desde))
                                                    .limit(Number(limite))
    console.log(categoriasSeleccionadas);
    
    res.status(201).json({
        "total":cantidad,
        categoriasSeleccionadas
    })
}




//Obtener categoria - populate
export const obtenerCategoriaPorId= async(req:Request,res:Response)=>{
    const {id}=req.query;


    const busqueda=await Categoria.findOne({id}).populate("usuario_id","nombre");

    console.log(busqueda);
    res.status(201).json({
        busqueda
    })
}


export const crearCategoria= async (req:Request,res:Response)=>{
    const categoria:categoria=req.body;
    console.log(categoria);
    
    const nombre = categoria.nombre.toUpperCase();
    
    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB){
        res.status(400).json({
            msg:`La categoría ${categoriaDB.nombre} ya existe`
        })
    }
    
    //Generar datos a guardar.
    const datos={
        nombre:nombre,
        usuario_id: req.uid
    }
    
    console.log(datos);

    const elemento = new Categoria(datos);

    //Guardar en DDBB
    try {
        await elemento.save();
        res.status(201).json(elemento);
    } catch (error) {
        res.status(500).json({
            msg:"Error al guardar la categoria en la BBDD"
        })
    }
    
}



//Actualizar Categoria
export const actualizarCategoria=async (req:Request,res:Response)=>{
    const {id}=req.params;
   
    
    const {estado,usuario_id, ...dato}=req.body;
  
  
    dato.nombre=dato.nombre.toUpperCase();
    dato.usuario_id=req.uid;

    const categoria=await Categoria.findByIdAndUpdate(id,dato,{new:true});
    
    


    res.status(200).json({
    
        categoria
    })
    

}

//Borrar categoria

export const categoriaDelete = async (req:Request,res:Response)=>{
    const {id}=req.params;
   
    const uid=req.uid;
    const categoriaAutenticado= req.usuario;

    //Borrado de la base de datos.
    //const usuarioBorrado = await Categoria.findByIdAndDelete(id);

    //Cambiamos el estado del usuario.
    const categoriaBorrado=await Categoria.findByIdAndUpdate(id,{estado:false});

    res.json({
        categoriaBorrado
    });
}