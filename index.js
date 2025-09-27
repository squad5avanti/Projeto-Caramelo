import express from "express"
import { PrismaClient } from "@prisma/client";



const app = express();
app.use(express.json());
const prismaClient = new PrismaClient();

app.get("/pets", async (request, response) => {
    const pets = await prismaClient.pets.findMany();
    return response.json(pets).send();
});
});
app.post("/pets", async (request, response) => {
    const { nome, especie, idade, descricao, status } = request.body;
    const pets = await prismaClient.pets.create({
        data: { nome, especie, idade, descricao, status }
    })

    const { nome, especie, idade, descricao, status } = request.body;
    const pets = await prismaClient.pets.create({
        data: { nome, especie, idade, descricao, status }
    })

    return response.status(201).json(pets);
})

app.put("/pets/:id", async (request, response) => {
    const { id } = request.params;
    const { nome, especie, idade, descricao, status } = request.body;

    const petExist = await prismaClient.pets.findUnique({
        where: { id: parseInt(id) }
    })

    if (!petExist) {
        return response.status(404).json({ message: "Pet não encontrado" });
    }

    const pet = await prismaClient.pets.update({
        data: { nome, especie, idade, descricao, status },
        where: { id: parseInt(id) }
    })

    return response.status(200).json(pet);
})
app.delete("/pets/:id", async (request, response) => {
    const { id } = request.params;
    const petExist = await prismaClient.pets.findUnique({
        where: { id: parseInt(id) }
    })

    if (!petExist) {
        return response.status(404).json({ message: "Pet não encontrado" });
    }
    await prismaClient.pets.delete({
        where: { id: parseInt(id) }
    });

    return response.status(200).json("Cadastro deletado com sucesso!");
});

app.get("/adotantes", async (request, response) => {
    try {
        const adotantes = await prismaClient.adotantes.findMany();
        return response.json(adotantes);
    } catch (error) {
        console.error("Erro ao buscar adotantes:", error);
        return response.status(500).json({ error: "Erro interno do servidor" });
    }
});

app.post("/adotantes", async (request, response) => {
    try {
        const { nome, email, telefone, endereco } = request.body;
        const novoAdotante = await prismaClient.adotantes.create({
            data: {
                nome,
                email,
                telefone,
                endereco
            }
        });
        return response.status(201).json(novoAdotante);
    } catch (error) {
        console.error("Erro ao cadastrar novo adotante", error);
        return response.status(500).json({ error: "Erro interno de servidor" });
    }
});

app.put("/adotantes/:id", async (request, response) => {
    const { id } = request.params;
    const { nome, email, telefone, endereco } = request.body;

    const adotanteExiste = await prismaClient.adotantes.findUnique({
        where: { id: parseInt(id) }
    });

    if (!adotanteExiste)
        return response.status.apply(404).json({ message: "Adotante não encontrado" });

    const adotante = await prismaClient.adotantes.update({
        data: {
            nome,
            email,
            telefone,
            endereco
        },
        where: { id: parseInt(id) }
    });

    return response.status(200).json(adotante);
});

app.delete("/adotantes/:id", async (request, response) => {
    const { id } = request.params;
    const adotante = await prismaClient.adotantes.findUnique({
        where: { id: parseInt(id) }
    })

    if (!adotante)
        return response.status(404).json({ message: "Adotante não encontrado" });

    await prismaClient.adotantes.delete({
        where: { id: parseInt(id) }
    });

    return response.status(200).json({
        message: "Adotante deletado com sucesso!"
    });
});

app.listen(8081, () => {
    console.log("Running port 8081")
});