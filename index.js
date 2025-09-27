import express from "express"
import { PrismaClient } from "@prisma/client";


const app = express();
app.use(express.json());
const prismaClient = new PrismaClient();

app.get("/pets", async (request, response) => {
    const pets = await prismaClient.pets.findMany();
    return response.json(pets).send();
});
app.post("/pets", async (request, response) => {
    const { nome, especie, idade, descricao, status} = request.body;
    pets.push({ nome, especie, idade, descricao, status})
    return response.status(201).json(pets);
});

app.listen(8080, () => {
    console.log("Running port 8080")
});