import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { AdotanteController } from "../controllers/AdotanteController.js";
import { AdocaoController } from "../controllers/AdocaoController.js";
import { PetController } from "../controllers/PetController.js";
import { LoginController } from "../controllers/LoginController.js";
import authenticate from "../middleware/authenticate.js";
import authorization from "../middleware/authorization.js";

const router = Router();
const adotanteController = new AdotanteController();
const adocaoController = new AdocaoController();
const petController = new PetController();
const userController = new UserController();
const loginController = new LoginController();

router.get("/usuarios",userController.obterTodosUsuarios); 
router.post("/usuarios",userController.salvarUsuario);
router.put("/usuarios/:id",authenticate,userController.atualizarUsuario); 
router.delete("/usuarios/:id",authorization,userController.excluirUsuario);

router.get("/adotantes",adotanteController.obterTodosAdotantes);
router.post("/adotantes",adotanteController.salvarAdotante);
router.put("/adotantes/:id",authenticate,adotanteController.atualizarAdotante);
router.delete("/adotantes/:id",authorization,adotanteController.removerAdotante);

router.get("/adocoes",adocaoController.obterTodasAdocoes);
router.post("/adocoes",adocaoController.salvarAdocao);
router.put("/adocoes/:id",authenticate,adocaoController.atualizarAdocao);
router.delete("/adocoes/:id",authorization,adocaoController.removerAdocao);

router.get("/pets",petController.obterTodosPets);
router.post("/pets",petController.salvarPet);
router.put("/pets/:id",authenticate,petController.atualizarPet);
router.delete("/pets/:id",authorization,petController.removerPet);

router.post("/login", loginController.login);

export default router