import { Router } from 'express';
import { getMenu, addproduct, removeproduct, editproduct } from '../controllers/menuController.js'
import authenticate from '../middleware/authenticate.js';
import productSchema from "../models/productSchema.js";
import joiHandler from "../middleware/joiHandler.js";


const router = Router();

// http://localhost:1337/menu
router.get('/', getMenu);

// http://localhost:1337/menu/add
router.post('/add', authenticate, joiHandler(productSchema), addproduct);

// http://localhost:1337/menu/:id
router.delete('/:id', authenticate, removeproduct);

// http://localhost:1337/menu/:id
router.put('/:id', authenticate, joiHandler(productSchema), editproduct);

export default router