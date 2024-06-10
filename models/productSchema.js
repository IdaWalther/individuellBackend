import Joi from "joi";

//Schema som används av joiHandler vid regestrering av ny produkt.
const productSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    price: Joi.number().positive().required()
});

export default productSchema;