import { prismaClient } from "../database/PrismaClient.js";

app.get("/pets", async (request, response) => {
    const pets = await prismaClient.pets.findMany();
    return response.json(pets).send();
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