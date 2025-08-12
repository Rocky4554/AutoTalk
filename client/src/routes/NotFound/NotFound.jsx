import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/'); // No page reload!
  };

  // Add this missing function
  const handleGoBack = () => {
    navigate(-1); // Goes back one step in browser history
  };

  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div className="not-found-container">
      <div className="error-code">404</div>
      <h1 className="error-message">Oops! Page Not Found</h1>
      <p className="error-description">
        The page you&apos;re looking for seems to have wandered off into the digital void. 
        Don&apos;t worry though, even the best explorers sometimes take a wrong turn!
      </p>
      
      <div className="buttons">
        <button 
          className="btn btn-primary" 
          onClick={(e) => {
            handleButtonClick(e);
            handleGoHome();
          }}
        >
          🏠 Go Home
        </button>
        <button 
          className="btn btn-secondary"
          onClick={(e) => {
            handleButtonClick(e);
            handleGoBack();
          }}
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;