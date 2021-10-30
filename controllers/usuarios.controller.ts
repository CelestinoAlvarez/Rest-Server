import { Request, Response } from "express";


export const usuariosGet = async (req:Request,res:Response)=>{

    const query = req.query;

    res.status(200).json({
        'msg':"Get - controller",
        'query':query
    });
};

export const usuariosPut = (req:Request,res:Response)=>{
    const {id}=req.params;

    res.json({
        msg:"PUT - controller",
        id
    });
};

export const usuariosPost = (req:Request,res:Response)=>{

    const body = req.body;
    res.json(body);
};

export const usuariosDelete = (req:Request,res:Response)=>{
    res.json({
        msg:"DELETE"
    });
}