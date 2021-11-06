import { Resolver } from "dns";
import {Request, Router} from "express";
import { check } from "express-validator";

import { googleSingIn, login } from "../controllers/auth.controller";
import { validarCampos } from "../middlewares/validar-campos";


export const router=Router();

router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token','ID-Token es obligatorio').not().isEmpty(),
    validarCampos
], googleSingIn);



module.exports=router;
