import Joi from "@hapi/joi";

export const productIdSchema = Joi.string().length(36);
const idItemInventorySchema = Joi.string();
const imagenUrlSchema = Joi.string();
const likeProductSchema = Joi.number();
const unlikeProductSchema = Joi.number();

export const createProductSchema = {
    idInventoryItems: idItemInventorySchema
};