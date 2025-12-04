import express from "express";
import { criarUsuario, listarUsuarios, buscaUsuarioPorId, deletarUsuario, loginUsuario } from "../controllers/usuarioscontroller.js";

const router = express.Router();

router.post("/", criarUsuario);
router.get("/", listarUsuarios);
router.get("/:id", buscaUsuarioPorId);
router.delete("/:id", deletarUsuario);

router.post("/login", loginUsuario);

export default router;