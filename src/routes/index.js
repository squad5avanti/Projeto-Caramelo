import { Router } from "express"
import { AdotanteController } from "../controllers/AdotanteController.js";

const router = Router();
const adotanteController = new AdotanteController();


router.get("/adotantes", adotanteController.encontrarTodosAdotantes);
router.post("/adotantes", adotanteController.salvarAdotante);
router.put("/adotantes/:id", adotanteController.atualizarAdotante);
router.delete("/adotantes/:id", adotanteController.removerAdotante);

export default router