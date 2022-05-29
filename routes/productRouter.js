import express from "express";
import productController from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

router.get("/products", productController.getProducts);
router.post("/products", auth, authAdmin, productController.createProduct);
router.delete(
   "/products/:id",
   auth,
   authAdmin,
   productController.deleteProduct
);
router.put("/products/:id", auth, authAdmin, productController.updateProduct);

export default router;
