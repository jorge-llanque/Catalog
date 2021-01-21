import Joi from "@hapi/joi";

export const productIdSchema = Joi.string().length(36);
const idItemInventorySchema = Joi.string();
const imagenUrlSchema = Joi.string();
const ratingIdSchema = Joi.string();
const rateValueSchema = Joi.string().valid('like', 'unlike');

export const createProductSchema = {
    idInventoryItems: idItemInventorySchema
};

export const rateProductSchema = {
    ratingId: ratingIdSchema,
    rate: rateValueSchema.required(),
}