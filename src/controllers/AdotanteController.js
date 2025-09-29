import { prismaClient } from "../database/PrismaClient.js";

export class AdotanteController {
    async encontrarTodosAdotantes (request, response) {
        try {
            const adotantes = await prismaClient.adotantes.findMany({
                select: {id: true, nome: true, email: true, telefone: true, endereco: true}
            });
            return response.status(200).json(adotantes);
        }
        catch (error) {
            return response.status(500).json(error);
        }
    }

    async salvarAdotante (request, response) {
        try {
            const {nome, email, telefone, endereco} = request.body;
            const adotante = await prismaClient.adotantes.create({
                data: {nome, email, telefone, endereco},
            });
            return response.status(201).json(adotante);
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async atualizarAdotante(request, response) {
        const {id} = request.params;
        const { nome, email, telefone, endereco } = request.body;

        try {
            const adotanteExiste = await prismaClient.adotantes.findUnique({
                where: {id: parseInt(id)}
            });

            if(!adotanteExiste)
                return response.status(404).json("Adotante não encontrado");

            const adotante = await prismaClient.adotantes.update({
                data: {nome, email, telefone, endereco},
                where: {id: parseInt(id)}
            });
            return response.status(200).json(adotante);
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async removerAdotante (request, response) {
        const {id} = request.params;

        try {
            const adotanteExiste = await prismaClient.adotantes.findUnique({
                where: {id: parseInt(id)}
            });

            if(!adotanteExiste)
                return response.status(404).json("Adotante não encontrado");

            await prismaClient.adotantes.delete({
                where: {id: parseInt(id)}
            });

            return response.status(204).send();
        } catch (error) {
            return response.status(500).json(error);
        }
    }
}
