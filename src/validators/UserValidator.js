import Joi from "joi";

export const createUserSchema = Joi.object({
  nome: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().max(50).min(11),
  senha: Joi.string().min(8).required(),
  usuarioadmin: Joi.boolean().default(false)
});
