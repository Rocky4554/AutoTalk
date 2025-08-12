// utils/emailService.js
import nodemailer from 'nodemailer';

// Create transporter using Gmail and secure port 465
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    secure: true,
    port: 465,
  });
};

// Send thank you email to user
export const sendThankYouEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Chatt AI Support" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Thank you for contacting Chatt AI!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin: 0; font-size: 28px;">Chatt AI</h1>
              <div style="width: 50px; height: 3px; background-color: #007bff; margin: 10px auto;"></div>
            </div>
            <h2 style="color: #333; margin-bottom: 20px;">Thank you for reaching out!</h2>
            <p style="color: #666; line-height: 1.6;">Hi ${userName},</p>
            <p style="color: #666; line-height: 1.6;">
              Thank you for contacting us through Chatt AI. We have received your message and truly appreciate you taking the time to reach out.
            </p>
            <p style="color: #666; line-height: 1.6;">
              Our team will review your message and get back to you within <strong>24-48 hours</strong>. We're committed to providing you with the best possible service.
            </p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 25px 0;">
              <p style="color: #666; font-size: 14px;">
                <strong>What happens next?</strong><br>
                • We'll review your inquiry carefully<br>
                • A team member will respond within 24-48 hours<br>
                • We'll provide you with detailed assistance
              </p>
            </div>
            <p style="color: #666; line-height: 1.6;">
              If you have any urgent questions, feel free to reply to this email.
            </p>
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
              <p style="color: #666;">
                Best regards,<br><strong>The Chatt AI Team</strong>
              </p>
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #999; font-size: 12px;">
              This is an automated response. Please do not reply to this email address.
            </p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Thank you email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending thank you email:', error);
    throw error;
  }
};

// Send contact form notification email to admin
export const sendNotificationEmail = async (userMessage) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Iamge AI Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🔔 New Contact Form Message from ${userMessage.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="margin: 0;">📧 New Contact Form Submission</h2>
              <p style="margin: 5px 0 0 0;">Chatt AI Website</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <div style="display: grid; gap: 15px;">
                <div><strong>👤 Name:</strong> ${userMessage.name}</div>
                <div><strong>📧 Email:</strong> <a href="mailto:${userMessage.email}" style="color: #007bff;">${userMessage.email}</a></div>
                <div><strong>📋 Subject:</strong> ${userMessage.subject}</div>
              </div>
            </div>
            <div>
              <strong>💬 Message:</strong>
              <div style="background: white; border: 1px solid #e9ecef; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: #666; line-height: 1.6;">
                ${userMessage.message}
              </div>
            </div>
            <div style="margin-top: 20px; border-top: 1px solid #e9ecef; padding-top: 15px; font-size: 14px;">
              <p><strong>📅 Received:</strong> ${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</p>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px;">
              <p style="color: #856404;"><strong>⏰ Reminder:</strong> Please respond within 24-48 hours as promised to the user.</p>
            </div>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Notification email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending notification email:', error);
    throw error;
  }
};

// Verify SMTP connection
export const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email service is ready to send emails');
    return true;
  } catch (error) {
    console.error('❌ Email service configuration error:', error);
    return false;
  }
};
