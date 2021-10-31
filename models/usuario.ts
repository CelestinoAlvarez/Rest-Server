import { Schema, model } from "mongoose";

interface usuario  {
    nombre:string,
    email:string,
    password:string,
    imagen:string,
    rol:string,
    estado:boolean,
    google:boolean
}

export const usuarioSchema=new Schema<usuario>({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    email:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'La contraseña es obligatoria']
    },
    imagen:{
        type:String
    },
    rol:{
        type:String,
        required:true
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

usuarioSchema.methods.toJSON=function(){
    const { __v, password, ...usuario }=this.toObject();
    return usuario;
}

export const Usuario=model<usuario>('Usuario', usuarioSchema);

