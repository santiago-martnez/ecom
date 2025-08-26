import express from "express";
import {createOrder, successPayment, failurePayment, pendingPayment} from '../controllers/payment.controller.js';
import { procesarPagoWebhook } from "../controllers/payment.controller.js";

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/success', successPayment);
router.get('/webhook', procesarPagoWebhook);
router.get('/pending', pendingPayment);
router.get('/failure', failurePayment);

export default router;
