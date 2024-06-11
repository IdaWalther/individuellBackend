import Joi from 'joi'

export const productPromotionSchema = Joi.object({
    title: Joi.string().required(),
});

const promotionSchema = Joi.object({
    products: Joi.array().items(productPromotionSchema).length(2).required(),
    discount: Joi.number().positive().required()
});

export default promotionSchema;