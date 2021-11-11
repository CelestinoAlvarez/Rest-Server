import { Request, Router,Response } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";
import { existeCategoria, existeProducto } from "../helpers/db-validators";
import { esAdminRole } from "../middlewares/validar-rol";
import { actualizarProducto, crearProducto, obtenerProductoPorId, obtenerProductos, productoDelete } from "../controllers/producto-controller";
import { actualizarCategoria, categoriaDelete, crearCategoria, obtenerCategoriaPorId } from "../controllers/categoria.controller";


export const router=Router();

//{{url}}/api/categorias

//Obtener todas las categorías. PUBLICO
router.get('/',
obtenerProductos);

//Obtener una categoría por id. PUBLICO
router.get('/:id',[
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(existeProducto),   //Lo hacemos en el db-validator
    validarCampos
], obtenerProductoPorId);

//Crear categoría - PRIVADO cualquier persona con token válido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],
crearProducto);

//Actualizar registro por id - PRIVADO cualquier persona con token válido
router.put('/:id', [
    validarJWT,
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(existeProducto),   //Lo hacemos en el db-validator
    check("nombre","Debe introducir un nombre").not().isEmpty(),
    validarCampos
],actualizarProducto);


//Borrar categoría - PRIVADO necesario usuario ADMIN
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', "No es un id válido").isMongoId(),
    check('id').custom(existeProducto),   //Lo hacemos en el db-validator
    validarCampos
], productoDelete);


module.exports=router;

