import express from "express";
import { getAuthenticationParameters } from "../controllers/uploadControllers.js";

const router = express.Router();

// AUTHENTICATION FOR IMAGEKIT
router.get("/", getAuthenticationParameters);

export default router;