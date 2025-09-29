import { Router } from "express"
import { AdotanteController } from "../controllers/AdotanteController.js";
import { AdocaoController } from "../controllers/AdocaoController.js";

const router = Router();
const adotanteController = new AdotanteController();
const adocaoController = new AdocaoController();


router.get("/adotantes", adotanteController.obterTodosAdotantes);
router.post("/adotantes", adotanteController.salvarAdotante);
router.put("/adotantes/:id", adotanteController.atualizarAdotante);
router.delete("/adotantes/:id", adotanteController.removerAdotante);

router.get("/adocoes", adocaoController.obterTodasAdocoes);
router.post("/adocoes", adocaoController.salvarAdocao);
router.put("/adocoes/:id", adocaoController.atualizarAdocao);
router.delete("/adocoes/:id", adocaoController.removerAdocao);

export default router