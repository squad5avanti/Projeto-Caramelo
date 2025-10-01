import { prismaClient } from "../database/PrismaClient.js";

export class PetController {

    async obterTodosPets (request, response) {
        try{
            const pets = await prismaClient.pets.findMany({
                select: {
                    nome: true, especie: true, nascimento: true, descricao: true, estado: true, tamanho: true, personalidade: true, avatar: true, fotos: true
                }
            });
            return response.status(200).json(pets);
        } catch(error){
            return response.status(500).json(error);
        }
    }

    async salvarPet (request, response) {
        try {
            const { nome, especie, nascimento, descricao, estado, tamanho, personalidade, avatar, fotos } = request.body;
            const adotante = await prismaClient.pets.create({
                data: {nome, especie, nascimento, descricao, estado, tamanho, personalidade, avatar, fotos},
            });
            return response.status(201).json(pets);
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async atualizarPet (request, response) {
        const {id} = request.params;
        const { nome, especie, nascimento, descricao, estado, tamanho, personalidade, avatar, fotos } = request.body;

        try {
            const petExiste = await prismaClient.pets.findUnique({
                where: {id: parseInt(id)}
            });

            if(!petExiste)
                return response.status(404).json("Pet não encontrado");

            const pet = await prismaClient.pets.update({
                data: { nome, especie, nascimento, descricao, estado, tamanho, personalidade, avatar, fotos },
                where: {id: parseInt(id)}
            });
            return response.status(200).json(pet);
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async removerPet (request, response) {
        const {id} = request.params;

        try {
            const petExiste = await prismaClient.pets.findUnique({
                where: {id: parseInt(id)}
            });

            if(!petExiste)
                return response.status(404).json("Pet não encontrado");

            await prismaClient.pets.delete({
                where: {id: parseInt(id)}
            });

            return response.status(204).send();
        } catch (error) {
            return response.status(500).json(error);
        }
    }
}
