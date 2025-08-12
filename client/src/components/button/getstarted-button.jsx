import React from 'react';
import './getstarted-button.css';

const HoverButton = () => {
  return (
    <button className="hover-button">
      Get Started
      <span className="animation-layer layer-1"></span>
      <span className="animation-layer layer-2"></span>
      <span className="animation-layer layer-3"></span>
      <span className="hover-text">Get Started</span>
    </button>
  );
};

export default HoverButton;