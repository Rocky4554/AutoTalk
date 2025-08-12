import React, { useState, useEffect } from 'react';
import './GlowModal.css';

const GlowModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Auto-open modal after 5 seconds (simulating dashboard entry)
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const redirectToImageAI = () => {
    // Replace with your actual Image AI route
    console.log('Redirecting to Image AI...');
    alert('Redirecting to Image AI!');
    closeModal();
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Content */}
      <div className={`dashboard-content ${isModalOpen ? 'blurred' : ''}`}>
        <h1 className="title">Welcome to Your Dashboard!</h1>
        <p className="subtitle">The modal will appear in 5 seconds...</p>
        <div className="dashboard-cards">
          <div className="card">Analytics</div>
          <div className="card">Reports</div>
          <div className="card">Settings</div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="animated-border-box-glow"></div>
            <div className="animated-border-box">
              <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>
                  ×
                </button>
                
                <div className="modal-header">
                  <h2 className="modal-title">🎨 New Feature Alert!</h2>
                </div>
                
                <div className="modal-body">
                  <p className="modal-text">Experience the power of our brand new <strong>Image AI</strong> tool!</p>
                  <p className="modal-text">Create stunning visuals, edit photos, and generate amazing artwork with just a few clicks.</p>
                  
                  <div className="feature-highlights">
                    <div className="highlight">✨ AI-Powered Generation</div>
                    <div className="highlight">🖼️ Smart Photo Editing</div>
                    <div className="highlight">🎯 Professional Results</div>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button className="try-now-btn" onClick={redirectToImageAI}>
                    Try Image AI Now
                  </button>
                  <button className="maybe-later-btn" onClick={closeModal}>
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlowModal;