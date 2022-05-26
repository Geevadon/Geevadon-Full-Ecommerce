import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/refresh_token", userController.refreshToken);
router.get("/me", auth, userController.me);

export default router;
