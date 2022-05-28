import express from "express";
import categoryController from "../controllers/categoryController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

router.get("/category", categoryController.getCategories);
router.post("/category", auth, authAdmin, categoryController.createCategory);
router.delete(
   "/category/:id",
   auth,
   authAdmin,
   categoryController.deleteCategory
);
router.put("/category/:id", auth, authAdmin, categoryController.updateCategory);

export default router;
