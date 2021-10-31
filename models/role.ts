import { Schema, model } from "mongoose";

interface role
{
    rol:string
}

export const roleSchema= new Schema({
    rol:{
            type:String,
            required:[true,'El role es obligatorio.']
        }
})

export const Role = model<role>('Role', roleSchema);
