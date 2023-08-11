import express from "express";
import { createChat, getChats, getChat } from "../controllers/chat.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();
// prefix /chat

// create a new chat
router.post("/", verifyToken, createChat);

// get all chats of a user
router.get("/", verifyToken, getChats);

// get a chat by id
router.get("/:id", verifyToken, getChat);

export default router;
