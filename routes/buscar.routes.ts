import { Router } from "express";
import { buscar } from "../controllers/buscar.controller";



export const router = Router();

router.get('/:coleccion/:termino', buscar)



module.exports=router;
