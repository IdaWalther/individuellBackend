import { Router } from "express";
import { getPromotions } from '../controllers/promotionController.js'
import authenticate from '../middleware/authenticate.js'

const router = Router();

// http://localhost:1337/promotions
router.get("/", authenticate, getPromotions);

export default router;