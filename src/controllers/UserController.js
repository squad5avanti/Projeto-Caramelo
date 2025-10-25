import { prismaClient } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";
import { createUserSchema } from "../validators/UserValidator.js";

export class UserController {

    async obterTodosUsuarios (request, response) {
        try{
            const users = await prismaClient.usuarios.findMany({
                select: {
                    id: true, nome: true, email: true, telefone: true
                }
            });
            return response.status(200).json(users);
        } catch(error){
            return response.status(500).json(error);
        }
    }

    async salvarUsuario(request, response) {
        const { error, value } = createUserSchema.validate(request.body);
        try{
            if(error){
                return response.status(400).json({message: "validation error", details: error.details})
            }

            const { nome, email, telefone, senha, usuarioadmin } = value;

            const passHash = bcrypt.hashSync(senha, 10);

            const user = await prismaClient.usuarios.create({
                data: { nome, email, telefone, senha: passHash, usuarioadmin },
                select: {
                    id: true, nome: true, email: true, telefone: true, usuarioadmin: true
                }
            })

            return response.status(201).json(user);
        } catch(error){
            return response.status(500).json(error);
        }
    }

    async atualizarUsuario(request, response) {
        const { id } = request.params;
        const { nome, telefone, email, usuarioadmin, senha } = request.body;

        try{
            const userExist = await prismaClient.usuarios.findUnique({
                where: { id: parseInt(id) }
            })

            if (!userExist) {
                return response.status(404).json("Usuário nao encontrado");
            }

            const passHash = bcrypt.hashSync(senha, 10);

            const user = await prismaClient.usuarios.update({
                data : { nome, telefone, email, usuarioadmin, senha: passHash },
                where: { id: parseInt(id) },
                select: {
                    id: true, nome: true, email: true, telefone: true, usuarioadmin: true
                }
            })

            return response.status(200).json(user);
        } catch(error){
            return response.status(500).json(error);
        }
    }


    async excluirUsuario(request, response) {
        const { id } = request.params;
        
        try{
            const userExist = await prismaClient.usuarios.findUnique({
                where: { id: parseInt(id) }
            })

            if (!userExist) {
                return response.status(404).json("Usuário nao encontrado");
            }

            await prismaClient.usuarios.delete({ where: { id: parseInt(id) } });

            return response.status(204).send();
        } catch(error){
            return response.status(500).json(error);
        }
    }
}
