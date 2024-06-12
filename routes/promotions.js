import { Router } from "express";
import { getPromotions, addPromotion } from '../controllers/promotionController.js'
import authenticate from '../middleware/authenticate.js'
import promotionSchema from "../models/promotionSchema.js";
import joiHandler from "../middleware/joiHandler.js";

const router = Router();

// http://localhost:1337/promotions
router.get("/", authenticate, getPromotions);

// http://localhost:1337/promotions/add 
router.post("/add", authenticate, joiHandler(promotionSchema), addPromotion);
export default router;