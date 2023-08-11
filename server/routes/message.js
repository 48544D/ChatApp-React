import express from "express";
import { createMessage, getMessages } from "../controllers/message.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

// prefix /message

// create a new message
router.post("/", verifyToken, createMessage);

// get all messages of a chat
router.get("/:chatId", verifyToken, getMessages);

export default router;
