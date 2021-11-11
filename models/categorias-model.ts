import { Schema, model } from "mongoose";

export interface categoria  {
    uid:string,
    nombre:string,
    estado:boolean,
    usuario_id:Schema.Types.ObjectId
}


export const categoriaSchema=new Schema<categoria>({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario_id:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }

});

categoriaSchema.methods.toJSON=function(){
    const { __v,_id, estado, ...categoria }=this.toObject();
    categoria.uid=_id;
    return categoria;
}


export const Categoria=model<categoria>('Categoria', categoriaSchema);