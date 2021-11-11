import { Request, Response } from "express";
import bcript  from "bcryptjs";


import { Usuario } from "../models/usuario";
import { Producto, producto} from "../models/producto-model";


//Obtener los productos

export const obtenerProductos = async (req:Request,res:Response)=>{
    const query = {estado:true};
    const {limite=5, desde=0}=req.query;

    // const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limite));
    // const total=await Usuario.countDocuments(query);

    const [total, productos]= await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.status(200).json({total, productos});
};


//Obtener producto - populate
export const obtenerProductoPorId= async(req:Request,res:Response)=>{
    const {id}=req.query;

    const busqueda=await Producto.findOne({id}).populate("id_usuario","nombre").populate("id_categoria","nombre");

    console.log(busqueda);
    res.status(201).json({
        busqueda
    })
}


export const crearProducto= async (req:Request,res:Response)=>{
    const producto:producto=req.body;
    
    const nombre = producto.nombre.toUpperCase();
    
    const productoDB = await Producto.findOne({nombre});

    if (productoDB){
        res.status(400).json({
            msg:`El producto ${productoDB.nombre} ya existe`
        })
    }
    
    //Generar datos a guardar.
    const datos={
        nombre:nombre,
        id_usuario: req.uid,
        precio:producto.precio,
        id_categoria:producto.id_categoria,
        descripcion:producto.descripcion
    }
    
    console.log("Datos: ",datos);

    const elemento = new Producto(datos);

    //Guardar en DDBB
    try {
        await elemento.save();
        res.status(201).json(elemento);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            msg:"Error al guardar el producto en la BBDD"
        })
    }
    
}



//Actualizar Producto
export const actualizarProducto=async (req:Request,res:Response)=>{
    const {id}=req.params;
    const {estado,id_usuario, ...dato}=req.body;
  
    dato.nombre=dato.nombre.toUpperCase();
    dato.usuario_id=req.uid;

    const producto=await Producto.findByIdAndUpdate(id,dato,{new:true});
    
    res.status(200).json({
        producto
    })
    

}

//Borrar producto

export const productoDelete = async (req:Request,res:Response)=>{
    const {id}=req.params;
   
    const uid=req.uid;
    const productoAutenticado= req.usuario;

    //Borrado de la base de datos.
    //const usuarioBorrado = await Categoria.findByIdAndDelete(id);

    //Cambiamos el estado del usuario.
    const productoBorrado=await Producto.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json({
        productoBorrado
    });
}