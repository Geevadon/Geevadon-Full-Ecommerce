import express from "express";
import paymentController from "../controllers/paymentController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/payment", paymentController.getPayments);
router.post("/payment", auth, paymentController.createPayment);

export default router;
