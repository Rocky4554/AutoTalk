import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import {
  createChat,
  getUserChats,
  getChatById,
  updateChat,
  streamChat
} from "../controllers/chatControllers.js";

const router = express.Router();

// CREATE A NEW CHAT
router.post("/", ClerkExpressRequireAuth(), createChat);

// STREAM CHAT RESPONSE
router.post("/stream", ClerkExpressRequireAuth(), streamChat);

// GET ALL USER CHATS
router.get("/user", ClerkExpressRequireAuth(), getUserChats);

// GET SPECIFIC CHAT BY ID
router.get("/:id", ClerkExpressRequireAuth(), getChatById);

// UPDATE CHAT WITH NEW CONVERSATION
router.put("/:id", ClerkExpressRequireAuth(), updateChat);

export default router;