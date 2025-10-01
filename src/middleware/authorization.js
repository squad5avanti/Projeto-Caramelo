import jwt from "jsonwebtoken"

export default function(request, response, next){
    const { authorization } = request.headers;

    try {
        if(!authorization) {
            return response.status(401).json("Unauthorized");
        }

        const { usuarioadmin } = jwt.verify(authorization, process.env.SECRET_JWT);

        if(!usuarioadmin) {
            return response.status(403).json("Forbidden")
        }

        next();

    } catch (error) {
        return response.status(500).json(error)
    }
}