import express from "express";
import { getUser, getUsers } from "../controllers/user.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.get("/:userId", verifyToken, getUser);
router.get("/", verifyToken, getUsers);

export default router;
