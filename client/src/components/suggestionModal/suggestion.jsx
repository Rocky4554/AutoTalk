
import React, { useState, useEffect } from 'react';
import './suggestion.css';

const PicHubModal = ({ isLoggedIn = true, isDashboard = true }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Only show modal if user is logged in and on dashboard
    if (isLoggedIn && isDashboard) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 10000); // 10 seconds delay

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isDashboard]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpenPicHub = () => {
    // Replace with your actual PicHub URL
    window.open('https://pichub.com', '_blank');
    setShowModal(false);
  };

  // Demo button to trigger modal immediately (remove in production)
  const triggerModal = () => {
    setShowModal(true);
  };

  if (!showModal) {
    return (
      <div className="demo-trigger">
        <button onClick={triggerModal} className="demo-button">
          Demo: Trigger Modal
        </button>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={handleClose}></div>
      
      {/* Modal */}
      <div className="modal-container">
        {/* Close Button */}
        <button onClick={handleClose} className="close-button">
          <span className="close-icon">×</span>
        </button>

        {/* Header */}
        <div className="modal-header">
          <div className="header-content">
            <div className="new-launch-badge">
              <span className="sparkles-icon">✨</span>
              <span className="badge-text">NEW LAUNCH</span>
            </div>
            <h2 className="modal-title">Try PicHub Pro</h2>
            <p className="modal-subtitle">Premium AI Image Generation</p>
          </div>
        </div>

        {/* Content */}
        <div className="modal-content">
          <div className="icon-container">
            <div className="image-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 16L8.586 11.414C8.961 11.039 9.47 10.828 10 10.828C10.53 10.828 11.039 11.039 11.414 11.414L16 16M14 14L15.586 12.414C15.961 12.039 16.47 11.828 17 11.828C17.53 11.828 18.039 12.039 18.414 12.414L20 14M14 8H14.01M6 20H18C19.105 20 20 19.105 20 18V6C20 4.895 19.105 4 18 4H6C4.895 4 4 4.895 4 6V18C4 19.105 4.895 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <h3 className="content-title">Professional AI Image Generation</h3>
          
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Generate high-quality images from text</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Commercial usage rights included</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Advanced customization options</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="button-container">
            <button onClick={handleClose} className="secondary-button">
              Not Now
            </button>
            <button onClick={handleOpenPicHub} className="primary-button">
              Explore PicHub Pro
            </button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="modal-accent"></div>
      </div>
    </div>
  );
};

export default PicHubModal;