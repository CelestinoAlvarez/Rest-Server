import {Router} from "express";
import { check } from "express-validator";

import { login } from "../controllers/auth.controller";
import { validarCampos } from "../middlewares/validar-campos";


export const router=Router();

router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);



module.exports=router;
