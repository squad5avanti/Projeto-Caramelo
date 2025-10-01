import { prismaClient } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class LoginController {

        async login (request, response) {
            const { email, senha } = request.body;

        try{
            const user = await prismaClient.usuarios.findUnique({ where: { email } });

            if (!user) {
            return response.status(401).json("Unauthorized");     
            }

            const passIsValid = bcrypt.compareSync(senha, user.senha);

            if(!passIsValid) {
            return response.status(401).json("Unauthorized");     
            }

            const payload = {id: user.id, nome: user.nome, usuarioadmin: user.usuarioadmin };

            const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '2h' });

            return response.status(200).json({...payload, token})
        } catch (error) {
            response.status(500).json({error})
        }

    }

}