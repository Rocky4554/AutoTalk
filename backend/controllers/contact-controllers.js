// controllers/contactController.js
 import { sendThankYouEmail, sendNotificationEmail } from '../utils/emailServices.js';

const handleContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields. Please provide name, email, and message.',
        fields: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          message: !message ? 'Message is required' : null
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Validate message length
    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long.'
      });
    }

    // Validate name length
    if (name.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters long.'
      });
    }

    // Send emails
    await Promise.all([
      sendThankYouEmail(email, name),
      sendNotificationEmail({ 
        name, 
        email, 
        message, 
        subject: 'Contact Form Message' 
      })
    ]);

    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24-48 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Check if it's an email service error
    if (error.code === 'EAUTH') {
      return res.status(503).json({
        success: false,
        message: 'Email service authentication failed. Please try again later.'
      });
    }
    
    if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      return res.status(503).json({
        success: false,
        message: 'Email service temporarily unavailable. Please try again later.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'An error occurred while sending your message. Please try again later.'
    });
  }
};

export default handleContactForm;