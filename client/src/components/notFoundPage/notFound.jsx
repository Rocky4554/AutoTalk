import React from 'react';
import './notFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* Sad Dog Animation */}
        <div className="sad-dog">
          <div className="dog-head">
            <div className="dog-ear dog-ear-left"></div>
            <div className="dog-ear dog-ear-right"></div>
            <div className="dog-eyes">
              <div className="dog-eye dog-eye-left">
                <div className="eye-pupil"></div>
                <div className="tear tear-left"></div>
              </div>
              <div className="dog-eye dog-eye-right">
                <div className="eye-pupil"></div>
                <div className="tear tear-right"></div>
              </div>
            </div>
            <div className="dog-nose"></div>
            <div className="dog-mouth"></div>
          </div>
          <div className="dog-body">
            <div className="dog-paw dog-paw-left"></div>
            <div className="dog-paw dog-paw-right"></div>
            <div className="dog-tail"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="error-message">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Oops! Page Not Found</h2>
          <p className="error-description">
            The page you're looking for seems to have wandered off like a lost puppy.
            Don't worry, even our sad dog couldn't find it!
          </p>
          
          {/* Action Buttons */}
          <div className="error-actions">
            <button 
              className="btn btn-primary"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => window.location.href = '/'}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-bone floating-bone-1"></div>
        <div className="floating-bone floating-bone-2"></div>
        <div className="floating-bone floating-bone-3"></div>
        <div className="floating-paw floating-paw-1">🐾</div>
        <div className="floating-paw floating-paw-2">🐾</div>
        <div className="floating-paw floating-paw-3">🐾</div>
      </div>
    </div>
  );
};

export default NotFound;