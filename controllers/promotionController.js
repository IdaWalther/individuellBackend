import nedb from "nedb-promises"
import menuDatabase from "./menuController.js"

//Skapar promotions db
const database = new nedb({ filename: "./data/promotions.db", autoload: true });

// @desc GET hämtar alla promotions, även inaktiva. 
// @route /promotions
export const getPromotions = async (req, res, next) => {
    try {
        const promotions = await database.find({});
        res.status(200).json(promotions)
    } catch (error) {
        next(error);
    }
}

// @desc POST Lägger till en promotion
// @route /promotions/add
export const addPromotion = async (req, res, next) => {
    try {
        let {products, discount, active} = req.body;
        discount = parseInt(discount);
        active = Boolean(active);
        const menu = await menuDatabase.find({});
        const menuTitles = menu.map(product => product.title);

        for (let product of products) {
            if (!menuTitles.includes(product.title)) {
                return res.status(404).json({message: "Produkten finns inte i menyn"})
            }
        }

        if (database.findOne({id: 'betterPrice'})) {
            await database.remove({id: 'betterPrice'});
        }
        const newPromotion = {
                id: 'betterPrice', 
                active,
                promotion: 'Bättre pris vid köp av två produkter',
                information: `Vi tycker att ${products[0].title} passar så bra med ${products[1].title} att vi ger dig ett bättre pris om du köper båda två!`,
                products,
                discount
        }

        await database.insert(newPromotion);
        res.status(201).json(newPromotion)
    } catch (error) {
        next(error);
    }
}
export default database