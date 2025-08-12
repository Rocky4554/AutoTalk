import React, { useState, useEffect } from 'react';

const PicHubModal = ({ isLoggedIn = true, isDashboard = true }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Only show modal if user is logged in and on dashboard
    if (isLoggedIn && isDashboard) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 5000); // 10 seconds delay

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isDashboard]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpenPicHub = () => {
    // Replace with your actual PicHub URL
    window.open('https://pic-hub-one.vercel.app/', '_blank');
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }

  return (
    <>
      <style jsx>{`
        @keyframes rotate {
          100% {
            transform: translate(-50%, -50%) rotate(1turn);
          }
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .modal-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
        }

        .animated-border-container {
          position: relative;
          max-width: 28rem;
          width: 100%;
          border-radius: 12px;
          z-index: 1;
        }

        .animated-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          overflow: hidden;
          filter: blur(20px);
          opacity: 0.7;
        }

        .animated-border-glow::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          background: conic-gradient(transparent, #24f8f8ff, transparent 30%);
          transform: translate(-50%, -50%);
          animation: rotate 4s linear infinite;
        }

        .animated-border-box {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }

        .animated-border-box::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 600px;
          height: 600px;
          background: conic-gradient(transparent, #3B82F6, transparent 30%);
          transform: translate(-50%, -50%);
          animation: rotate 4s linear infinite;
          z-index: -1;
        }

        .modal-content-wrapper {
          position: relative;
          background: #0F172A;
          border-radius: 9px;
          margin: 3px;
          overflow: hidden;
          z-index: 1;
        }

        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          width: 32px;
          height: 32px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          backdrop-filter: blur(8px);
          color: #E2E8F0;
          font-size: 18px;
          font-weight: bold;
        }

        .close-button:hover {
          background: rgba(30, 41, 59, 0.8);
          transform: scale(1.05);
        }

        .modal-header {
          background: linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%);
          padding: 24px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .modal-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
        }

        .header-content {
          position: relative;
          z-index: 1;
        }

        .new-launch-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          background: rgba(255, 255, 255, 0.15);
          padding: 4px 8px;
          border-radius: 20px;
          backdrop-filter: blur(4px);
        }

        .badge-text {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }

        .modal-subtitle {
          color: rgba(226, 232, 240, 0.8);
          font-size: 14px;
          margin: 0;
          font-weight: 400;
        }

        .modal-content {
          padding: 24px;
          color: #E2E8F0;
        }

        .icon-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .image-icon {
          width: 64px;
          height: 64px;
          background: rgba(30, 41, 59, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .content-title {
          font-size: 20px;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0 0 32px 0;
          text-align: center;
        }

        .features-list {
          margin-bottom: 24px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #CBD5E1;
          line-height: 1.5;
        }

        .feature-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .button-container {
          display: flex;
          gap: 12px;
        }

        .secondary-button,
        .primary-button {
          flex: 1;
          padding: 12px 16px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          border: none;
        }

        .secondary-button {
          background: rgba(30, 41, 59, 0.5);
          color: #E2E8F0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .secondary-button:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .primary-button {
          background: linear-gradient(135deg, #3B82F6, #7C3AED);
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          font-weight: 600;
        }

        .primary-button:hover {
          background: linear-gradient(135deg, #2563EB, #6D28D9);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
          transform: translateY(-1px);
        }

        .modal-accent {
          height: 4px;
          background: linear-gradient(90deg, #1E40AF, #7C3AED);
        }
      `}</style>

      <div className="modal-overlay">
        {/* Backdrop */}
        <div className="modal-backdrop" />
        
        {/* Animated Border Container */}
        <div className="animated-border-container">
          {/* Glow Effect */}
          <div className="animated-border-glow" />
          
          {/* Main Border Box */}
          <div className="animated-border-box">
            {/* Modal Content */}
            <div className="modal-content-wrapper">
              {/* Close Button */}
              <button onClick={handleClose} className="close-button">
                ×
              </button>

              {/* Header */}
              <div className="modal-header">
                <div className="header-content">
                  <div className="new-launch-badge">
                    <span style={{ fontSize: '16px' }}>✨</span>
                    <span className="badge-text">NEW LAUNCH</span>
                  </div>
                  <h2 className="modal-title">Try PicHub Pro</h2>
                  <p className="modal-subtitle">Premium AI Image Generation</p>
                </div>
              </div>

              {/* Content */}
              <div className="modal-content">
                <h3 className="content-title">Professional AI Image Generation</h3>

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
              <div className="modal-accent" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PicHubModal;