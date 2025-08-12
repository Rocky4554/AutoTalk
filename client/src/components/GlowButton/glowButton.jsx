// GlowButton.jsx
import React from 'react';
import './glowButtton.css';

const GlowButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '', 
  ...props 
}) => {
  return (
    <button 
      className={`btn btn--glow ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

export default GlowButton;