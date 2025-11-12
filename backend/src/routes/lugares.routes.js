import { Router } from "express";
import { listarLugares } from "../controllers/lugarController.js";

const router = Router();
router.get("/", listarLugares);

export default router;
