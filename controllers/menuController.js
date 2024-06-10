import nedb from 'nedb-promises';

//Skapar menu-db
export const database = new nedb({
    filename: './data/menu.db',
    autoload: true
});

// @desc GET Hämtar allt på menyn
// @route /menu
export const getMenu = async (req, res, next) => {
    try {
        const menu = await database.find({});
        res.status(200).json(menu);
    } catch (error) {
        next(error);
    }
};

// @desc POST Lägger till en produkt på menyn
// @route /menu/add
export const addproduct = async (req, res, next) => {
    try {
        const { title, desc, price } = req.body;

        const existingProduct = await database.findOne({ title: title});
        if (existingProduct) {
            const error = new Error();
            error.status = 409;
            error.message = "Produkten finns redan";
            throw(error);
        }

        //Hämtar alla produkter i databasen och sorterar dem efter id i fallande ordning och tar den första produkten och sparar till lastProduct
        const lastProduct = await database.find({}).sort({id: -1}).limit(1);
        // Skapar ett id genom att ta det sista id i databasen och lägga till 1, eller om ingen produkt finns så blir den nya produkten 1.
        const newId = lastProduct.length > 0 ? parseInt(lastProduct[0].id, 10) + 1 : 1;

        const createdAt = new Date().toLocaleString('sv-Se', {timeZone: 'Europe/Stockholm'});

        const product = {
            id: newId,
            title: title,
            desc: desc,
            price: parseInt(price),
            createdAt: createdAt
        }      

        const newProduct = await database.insert(product);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
}

// @desc DELETE Tar bort en produkt från menyn
// @route /menu/:id

export const removeproduct = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const findProduct = await database.findOne({id: id});

        console.log(findProduct)

        if(!findProduct) {
            const error = new Error();
            error.status = 404;
            error.message = "Produkten finns inte på menyn";
            throw(error);
        }

        const deletedProduct = await database.remove({id: id}, {});

        res.status(200).send({
            success: true,
            status: 200,
            message: 'Produkten är borttagen från menyn',
            data: { findProduct }
        })
    } catch (error) {
        next(error);
    }
}

// @desc PUT Redigerar en produkt på menyn
// @route /menu/:id

export const editproduct = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { title, desc, price } = req.body;

        const findProduct = await database.findOne({id: id});

        if(!findProduct) {
            const error = new Error();
            error.status = 404;
            error.message = "Produkten finns inte på menyn";
            throw(error);
        } 

        const editedAt = new Date().toLocaleString('sv-Se', {timeZone: 'Europe/Stockholm'});

        const editProduct = await database.update({id: id}, {id: id, title: title, desc: desc, price: parseInt(price), editedAt: editedAt});
        const updatedProduct = await database.findOne({id: id});

        res.status(200).send({
            success: true,
            status: 200,
            message: 'Produkten är redigerad',
            data: { product: updatedProduct }
        })
    } catch (error) {
        next(error);
    }
}

export default database