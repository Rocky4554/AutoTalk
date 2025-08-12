import express from "express";
import uploadRoutes from "./uploadRoutes.js";
import chatRoutes from "./chatRoutes.js";
import contactRoutes from "./contact.js";

const router = express.Router();

// Mount all route modules
router.use("/upload", uploadRoutes);
router.use("/chats", chatRoutes);
router.use("/userchats", chatRoutes); // For backward compatibility with /api/userchats
router.use("/contact-us", contactRoutes); // Placeholder for contact routes


export default router;