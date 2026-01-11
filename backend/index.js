import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./database/index.js";
import apiRoutes from "./routes/index.js";

// Load environment variables
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// CORS - Update with your actual frontend URLs
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:3000",      // React dev server
      "http://localhost:5173",      // Vite dev server
      "https://your-frontend.vercel.app"  // Replace with actual frontend URL
    ],
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend API is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Internal server error",
    message: err.message 
  });
});

// 404 handler for API routes
app.use("*", (req, res) => {
  res.status(404).json({ 
    error: "API endpoint not found",
    path: req.originalUrl 
  });
});

// Export for Vercel
export default app;

// Only start server locally (not on Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    connect();
    console.log(`Server running on port ${port}`);
  });
}