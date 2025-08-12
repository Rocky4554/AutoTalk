// routes/contactRoutes.js
import express from 'express';
import handleContactForm from '../controllers/contact-controllers.js';

const router = express.Router();

// POST /api/contact - Handle contact form submission
router.post('/', handleContactForm);

// Handle other HTTP methods on /contact route
router.all('/', (req, res) => {
  res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed. Only POST requests are accepted.`
  });
});

export default router;