import express from "express"
import { PrismaClient } from "@prisma/client";


const app = express();
app.use(express.json());
const prismaClient = new PrismaClient();

//adoção
app.get("/adocoes", async (request, response) => {
    const adocoes = await prismaClient.adocoes.findMany();
    return response.json(adocoes).send();
});

app.post("/adocoes", async (request, response) => {
    const { pets_id, adotantes_id, data_adocao  } = request.body;
    const adocoes = await prismaClient.adocoes.create({
        data: { pets_id, adotantes_id, data_adocao: new Date (data_adocao) }
    })

    return response.status(201).json(adocoes);
})

app.put("/adocoes/:id", async (request, response) => {
    const { id } = request.params;
    const { pets_id, adotantes_id, data_adocao } = request.body;

    const adoptionExist = await prismaClient.adocoes.findUnique({ 
        where: { adocao_id: parseInt(id) }
    })

    if (!adoptionExist) {
        return response.status(404).json({message: "Adoção não encontrada"});
    }

    const adocao = await prismaClient.adocoes.update({
        data : { pets_id, adotantes_id, data_adocao: new Date (data_adocao) },
        where: { adocao_id: parseInt(id) }
    })

    return response.status(200).json(adocao);
})

app.delete("/adocoes/:id", async (request, response) => {
    const { id } = request.params;
    const adoptionExist = await prismaClient.adocoes.findUnique({ 
        where: { adocao_id: parseInt(id) }
    })

    if (!adoptionExist) {
        return response.status(404).json({message: "Adoção não encontrada"});
    }
    await prismaClient.adocoes.delete({
    where: { adocao_id: parseInt(id) }
  });

    return response.status(200).json("Cadastro deletado com sucesso!");
})

app.listen(8081, () => {
    console.log("Running port 8081")
});