import express from "express"
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
const prismaClient = new PrismaClient();

app.get("/pets", async (request, response) => {
    const pets = await prismaClient.pets.findMany();
    return response.json(pets).send();
})