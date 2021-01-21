import Joi from "@hapi/joi";

export const inventoryIdSchema = Joi.string();
const inventoriesNameSchema = Joi.string().min(2).max(30);
const inventoriesDescriptionSchema = Joi.string().min(1).max(200);

export const createInventorySchema = {
    name: inventoriesNameSchema.required(),
    description: inventoriesDescriptionSchema.required()
};

export const updateInventorySchema = {
    name: inventoriesNameSchema,
    description: inventoriesDescriptionSchema
}