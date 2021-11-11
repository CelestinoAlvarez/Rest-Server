import { Request, Router,Response } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos";
import { crearCategoria, obtenerCategorias, actualizarCategoria, obtenerCategoriaPorId, categoriaDelete } from "../controllers/categoria.controller";
import { validarJWT } from "../middlewares/validar-jwt";
import { existeCategoria } from "../helpers/db-validators";
import { esAdminRole } from "../middlewares/validar-rol";


export const router=Router();

//{{url}}/api/categorias

//Obtener todas las categorías. PUBLICO
router.get('/',
obtenerCategorias);

//Obtener una categoría por id. PUBLICO
router.get('/:id',[
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(existeCategoria),   //Lo hacemos en el db-validator
    validarCampos
], obtenerCategoriaPorId);

//Crear categoría - PRIVADO cualquier persona con token válido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],
crearCategoria 
);

//Actualizar registro por id - PRIVADO cualquier persona con token válido
router.put('/:id', [
    validarJWT,
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(existeCategoria),   //Lo hacemos en el db-validator
    check("nombre","Debe introducir un nombre").not().isEmpty(),
    validarCampos
],actualizarCategoria);


//Borrar categoría - PRIVADO necesario usuario ADMIN
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(existeCategoria),   //Lo hacemos en el db-validator
    validarCampos
], categoriaDelete);




module.exports=router;

