import { Router } from "express";
import lugaresRoutes from "./lugares.routes.js";

const router = Router();
router.use("/lugares", lugaresRoutes);

export default router;
