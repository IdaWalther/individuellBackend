import { Router } from 'express';
import { getMenu, addproduct } from '../controllers/menuController.js'
import authenticate from '../middleware/authenticate.js';
import productSchema from "../models/productSchema.js";
import joiHandler from "../middleware/joiHandler.js";


const router = Router();

// http://localhost:1337/menu
router.get('/', getMenu);
router.post('/add', authenticate, joiHandler(productSchema), addproduct);

export default router