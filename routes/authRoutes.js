import { Router } from "express";
import { login, logout, signup } from "../controllers/authController.js";

const router = Router();

// REGISTER
router.post("/register", signup);

// LOGIN
router.post("/login", login);

// LOGOUT
router.post("/logout", logout);

export default router;

