import express from "express";
import { criarUsuario, listarUsuarios, buscarUsuarioPorId, deletarUsuario } from "../controllers/usuarios.controller.js";

const router = express.Router();

router.post("/", criarUsuario);
router.get("/", listarUsuarios);
router.get("/:id", buscarUsuarioPorId);
router.delete("/:id", deleteUsuario);

export default router;