import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connect from "./database/index.js";
import apiRoutes from "./routes/index.js";

// Load environment variables
dotenv.config();

const port = process.env.PORT;
const app = express();


// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


app.use(express.json());

// API Routes
app.use("/api", apiRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});


// Catch all handler for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"index.html"));
});

// Start server
app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});