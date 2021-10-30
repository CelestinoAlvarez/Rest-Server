import {Router} from "express";
import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } from "../controllers/usuarios.controller";



export const router=Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

module.exports = router;


