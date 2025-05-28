import express from "express";
import { auth } from "../middleware";
import { loginUser, registerUser } from "../controllers/auth";

const router = express.Router();
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", auth);
// router.post("/logout", logout);

export { router };
