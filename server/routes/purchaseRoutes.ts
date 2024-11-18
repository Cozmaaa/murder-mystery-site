import express from 'express';
const router = express.Router();
import {createCheckoutSession} from "../controllers/purchaseController";

router.post('/create-checkout-session',createCheckoutSession);

export default router;