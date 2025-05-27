import express from "express";
import auth from "../middleware/auth";
import { loginUser, registerUser } from "../controllers/user";

const router = express.Router();
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", auth);

// router.post("/logout", logout);

export { router };
