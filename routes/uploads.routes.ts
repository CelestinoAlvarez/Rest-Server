import { Router } from "express";
import { check } from "express-validator";
import { actualizarImagen, actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from "../controllers/uploads.controller";
import { coleccionesPermitidas } from "../helpers/db-validators";
import { subirArchivo } from "../helpers/subir-archivo";
import { validarArchivo } from "../middlewares/validar-archivo";
import { validarCampos } from "../middlewares/validar-campos";


export const router=Router();

router.post('/', validarArchivo, cargarArchivo);
router.put('/:coleccion/:id',[
    check('id','El id deber ser de Mongo').isMongoId(),
    check('coleccion',"Debe estan dentro de los tipos permitidos").custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary);

router.get('/:coleccion/:id',[
    check('id','El id deber ser de Mongo').isMongoId(),
    check('coleccion',"Debe estan dentro de los tipos permitidos").custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen);



module.exports=router;