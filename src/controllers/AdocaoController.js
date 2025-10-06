import { prismaClient } from "../database/PrismaClient.js";

export class AdocaoController {

    async obterTodasAdocoes (request, response) {
        try {
            const adocoes = await prismaClient.adocoes.findMany();
            return response.json(adocoes).send();
        } catch (error) {
            return response.status(500).json(error);
        }
    }
    
    async salvarAdocao (request, response) {
        try{
            const { pets_id, adotantes_id, data_adocao  } = request.body;
            const adocoes = await prismaClient.adocoes.create({
                data: { pets_id, adotantes_id, data_adocao }
            });
            return response.status(201).json(adocoes);
        } catch (error) {
            return response.status(500).json(error);
        }
    }
    
    async atualizarAdocao (request, response) {
        try {
            const { id } = request.params;
            const { pets_id, adotantes_id, data_adocao } = request.body;
        
            const adoptionExist = await prismaClient.adocoes.findUnique({ 
                where: { id: parseInt(id) }
            });

            if (!adoptionExist) {
                return response.status(404).json({message: "Adoção não encontrada"});
            }

            const adocao = await prismaClient.adocoes.update({
                data : { pets_id, adotantes_id, data_adocao },
                where: { id: parseInt(id) }
                select: {
                    pets_id: true, adotantes_id: true, data_adocao: true
                }
            });
    
            return response.status(200).json(adocao);
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    async removerAdocao (request, response) {
        try {
            const { id } = request.params;
            const adoptionExist = await prismaClient.adocoes.findUnique({ 
                where: { id: parseInt(id) }
            });
    
            if (!adoptionExist) {
                return response.status(404).json({message: "Adoção não encontrada"});
            }
            await prismaClient.adocoes.delete({
                where: { id: parseInt(id) }
            });
    
            return response.status(200).json("Cadastro deletado com sucesso!");
        } catch (error) {
            return response.status(500).json(error);
        }
    }
}
