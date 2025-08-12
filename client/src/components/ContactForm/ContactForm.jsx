import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fix: Correct way to access Vite environment variables
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Name is required');
      return false;
    }
    
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    
    if (!formData.message.trim()) {
      setErrorMessage('Message is required');
      return false;
    }
    
    if (formData.message.trim().length < 10) {
      setErrorMessage('Message must be at least 10 characters long');
      return false;
    }
    
    if (!agreedToPrivacy) {
      setErrorMessage('Please agree to the Privacy Policy');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');
    setErrorMessage('');

    // Debug: Log the API URL and request data
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('Request URL:', `${API_BASE_URL}/api/contact-us`);
    console.log('Form data:', {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim()
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return JSON response');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setAgreedToPrivacy(false);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || `Server error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // More specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setErrorMessage('Unable to connect to server. Please check if the server is running and try again.');
      } else if (error.message.includes('JSON')) {
        setErrorMessage('Server returned an invalid response. Please try again later.');
      } else {
        setErrorMessage(`Network error: ${error.message}. Please check your connection and try again.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-layout">
        {/* Left side - Contact Info */}
        <div className="contact-info-section">
          <div className="contact-info-content">
            <p className="contact-section-label">Contact Section</p>
            <h1 className="contact-main-heading">
              Get in touch
            </h1>
            <p className="contact-description">
              We'd love to hear from you! Send us a message and we'll respond within 24-48 hours. Our team is ready to help you with any questions or concerns.
            </p>

            {/* Contact Details */}
            <div className="contact-details">
              <div className="contact-detail-item">
                <Phone className="contact-detail-icon" />
                <span className="contact-detail-text">8092345121</span>
              </div>
              <div className="contact-detail-item">
                <Mail className="contact-detail-icon" />
                <span className="contact-detail-text">ultimatekller45@gmail.com</span>
              </div>
              <div className="contact-detail-item address">
                <MapPin className="contact-detail-icon address" />
                <span className="contact-detail-text">Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <div className="contact-form-section">
          <div className="contact-form-content">
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="status-message success">
                <CheckCircle className="status-icon success" />
                <div className="status-content">
                  <p className="status-title">Message sent successfully!</p>
                  <p className="status-text success">We'll get back to you within 24-48 hours.</p>
                </div>
              </div>
            )}
            
            {(submitStatus === 'error' || errorMessage) && (
              <div className="status-message error">
                <AlertCircle className="status-icon error" />
                <div className="status-content">
                  <p className="status-title">Error</p>
                  <p className="status-text error">{errorMessage || 'Something went wrong. Please try again.'}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="form-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  rows={4}
                  className="form-textarea"
                  required
                  disabled={isSubmitting}
                />
                <p className="character-hint">Minimum 10 characters</p>
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={agreedToPrivacy}
                  onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                  className="checkbox-input"
                  disabled={isSubmitting}
                />
                <label htmlFor="privacy" className="checkbox-label">
                  I agree to the{' '}
                  <a 
                    href="/privacy-policy" 
                    className="privacy-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>{' '}
                  and consent to being contacted regarding my inquiry. *
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="submit-button-icon spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send message</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;