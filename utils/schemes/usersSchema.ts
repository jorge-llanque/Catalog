import Joi from "@hapi/joi";

export const userIdSchema = Joi.string().length(36);
const usernameSchema = Joi.string().min(3).max(50).alphanum();
const userEmailSchema = Joi.string().email();
const userPasswordSchema = Joi.string().min(8);
const role = Joi.string().min(5).alphanum();

export const createUserSchema = {
    username: usernameSchema.required(),
    password: userPasswordSchema.required(),
    email: userEmailSchema.required()
}

export const updateUserSchema = {
    username: usernameSchema,
    password: userPasswordSchema,
    email: userEmailSchema
}

