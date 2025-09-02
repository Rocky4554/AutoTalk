// import express from "express";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";
// import connect from "./database/index.js";
// import apiRoutes from "./routes/index.js";

// // Load environment variables
// dotenv.config();

// const port = process.env.PORT;
// const app = express();


// // Middleware
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );


// app.use(express.json());

// // API Routes
// app.use("/api", apiRoutes);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const distPath = path.join(__dirname, 'dist');

// app.use(express.static(distPath));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(401).send("Unauthenticated!");
// });


// // Catch all handler for SPA
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname,"index.html"));
// });

// // Start server
// app.listen(port, () => {
//   connect();
//   console.log(`Server running on port ${port}`);
// });

///////
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connect from "./database/index.js";
import apiRoutes from "./routes/index.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || process.env.VERCEL_URL || "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api", apiRoutes);

// Path helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "dist");

// Serve frontend
app.use(express.static(distPath, { maxAge: "1y", etag: false }));

// SPA fallback (for React Router)
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});

// DB connect
connect().catch((err) => {
  console.error("Database connection failed:", err);
});

export default app;
