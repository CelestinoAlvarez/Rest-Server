import { Schema, model } from "mongoose";

export interface producto
{
    nombre:string,
    estado:boolean,
    precio:number,
    descripcion:string,
    disponible:boolean,
    id_usuario:Schema.Types.ObjectId,
    id_categoria:Schema.Types.ObjectId,
    imagen:string
}

export const productoSchema= new Schema({
    nombre:{
            type:String,
            required:[true,'El nombre obligatorio.'],
            unique:true
        },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    id_usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    precio:{
        type:Number,
        default:0
    },
    id_categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    descripcion : { type:String },
    disponible : { type:Boolean, default:true },
    imagen:{type:String}
})

productoSchema.methods.toJSON=function(){
    const { __v, _id, ...producto }=this.toObject();
    producto.uid=_id;
    return producto;
}

export const Producto = model<producto>('Producto', productoSchema);
