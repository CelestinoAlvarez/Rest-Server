import {Router} from "express";
import { check } from "express-validator";

import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } from "../controllers/usuarios.controller";
import { esRolValido, existeEmail, existeUsuarioPorId } from "../helpers/db-validators";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";



export const router=Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe tener más de 6 caracteres').isLength({min:6}),
    check('email','Correo no válido').isEmail(),
    check('email').custom(existeEmail),
    //check('rol','Rol no válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost);

router.delete('/:id', [
    validarJWT,
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete);

module.exports = router;


