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

// Load environment variables
dotenv.config();

const app = express();

// Trust proxy for Vercel
app.set('trust proxy', 1);

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || process.env.VERCEL_URL || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Clerk webhook endpoint (if you're using Clerk webhooks)
app.post("/api/webhooks/clerk", express.raw({ type: 'application/json' }), (req, res) => {
  try {
    // Handle Clerk webhook events here
    // You'll need to verify the webhook signature
    console.log("Clerk webhook received");
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Clerk webhook error:", error);
    res.status(400).json({ error: "Webhook processing failed" });
  }
});

// API Routes - These handle your backend API
app.use("/api", apiRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

// Serve static files from dist folder (your frontend build)
app.use(express.static(distPath, {
  maxAge: '1y', // Cache static assets
  etag: false
}));

// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  
  // Don't expose error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    error: isDevelopment ? err.message : "Internal Server Error",
    ...(isDevelopment && { stack: err.stack })
  });
});

// Catch all handler for SPA - MUST be last
// This serves index.html for all non-API routes (React Router, etc.)
app.get("*", (req, res) => {
  // Don't serve SPA for API routes that weren't found
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      console.error("Error serving index.html:", err);
      res.status(500).json({ error: "Could not serve application" });
    }
  });
});

// Initialize database connection
connect().catch(err => {
  console.error("Database connection failed:", err);
});

// Export the Express app as default for Vercel
export default app;