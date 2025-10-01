import jwt from "jsonwebtoken"

export default function(request, response, next){
    const { authorization } = request.headers;

    try {
        if(!authorization) {
            return response.status(401).json("Unauthorized");
        }

        const { id } = jwt.verify(authorization, process.env.SECRET_JWT);

        if(!id) {
            return response.status(401).json("Token invalid")
        }

        next();

    } catch (error) {
        return response.status(500).json(error)
    }
}