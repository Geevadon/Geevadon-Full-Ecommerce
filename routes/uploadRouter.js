import express from "express";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";
import uploadController from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload", auth, authAdmin, uploadController.upload);
router.post("/delete-img", auth, authAdmin, uploadController.delete);

export default router;
