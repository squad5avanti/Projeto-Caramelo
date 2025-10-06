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

router.get("/usuarios",authorization,userController.obterTodosUsuarios); 
router.post("/usuarios",authorization,userController.salvarUsuario);
router.put("/usuarios/:id",authorization,userController.atualizarUsuario); 
router.delete("/usuarios/:id",authorization,userController.excluirUsuario);

router.get("/adotantes",authorization,adotanteController.obterTodosAdotantes);
router.post("/adotantes",authorization,adotanteController.salvarAdotante);
router.put("/adotantes/:id",authorization,adotanteController.atualizarAdotante);
router.delete("/adotantes/:id",authorization,adotanteController.removerAdotante);

router.get("/adocoes",authorization,adocaoController.obterTodasAdocoes);
router.post("/adocoes",authorization,adocaoController.salvarAdocao);
router.put("/adocoes/:id",authorization,adocaoController.atualizarAdocao);
router.delete("/adocoes/:id",authorization,adocaoController.removerAdocao);

/* 
Usuários logados no site vão conseguir acessar a lista de pets do abrigo bem como cadastrar seus pets para futura aprovação dos administradores do abrigo.
Atualizar e remover pets do cadastro é uma funcionalidade restrita aos administradores, ou seja, Usuários que tem permissão "usuarioadmin" como "true" no banco de dados.
*/
router.get("/pets",authenticate,petController.obterTodosPets);
router.post("/pets",authenticate,petController.salvarPet);
router.put("/pets/:id",authorization,petController.atualizarPet);
router.delete("/pets/:id",authorization,petController.removerPet);

router.post("/login", loginController.login);

export default router
