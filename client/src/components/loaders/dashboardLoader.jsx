
import React from 'react';
import './dashboardLoader.css';

const DashboardLoader = () => {
  return (
    <div className="shimmer-container">
      {/* Header Shimmer */}
      <header className="shimmer-header">
        <div className="shimmer-header-left">
          <div className="shimmer shimmer-logo"></div>
          <div className="shimmer shimmer-logo-text"></div>
        </div>
        <div className="shimmer-header-right">
          <div className="shimmer shimmer-header-button"></div>
          <div className="shimmer shimmer-header-button"></div>
        </div>
      </header>

      {/* Main Content Shimmer */}
      <main className="shimmer-main">
        {/* Sidebar Shimmer */}
        <div className="shimmer-sidebar">
          <div className="shimmer shimmer-sidebar-button"></div>
          <div className="shimmer shimmer-sidebar-button"></div>
          <div className="shimmer-divider"></div>
          <div className="shimmer shimmer-sidebar-title"></div>
          <div className="shimmer shimmer-sidebar-item"></div>
          <div className="shimmer shimmer-sidebar-item"></div>
          <div className="shimmer shimmer-sidebar-item"></div>
          <div className="shimmer shimmer-sidebar-item"></div>
        </div>

        {/* Content Area Shimmer - Empty for now */}
        <div className="shimmer-content">
          {/* Content area is now empty since action cards and search are fixed positioned */}
        </div>
      </main>

      {/* Fixed Action Cards at Bottom */}
      <div className="shimmer-action-cards">
        <div className="shimmer-action-card">
          <div className="shimmer shimmer-action-card-icon"></div>
          <div className="shimmer shimmer-action-card-text"></div>
        </div>
        <div className="shimmer-action-card">
          <div className="shimmer shimmer-action-card-icon"></div>
          <div className="shimmer shimmer-action-card-text"></div>
        </div>
        <div className="shimmer-action-card">
          <div className="shimmer shimmer-action-card-icon"></div>
          <div className="shimmer shimmer-action-card-text"></div>
        </div>
      </div>

      {/* Fixed Search Bar at Bottom */}
      <div className="shimmer-search-section">
        <div className="shimmer shimmer-search-bar"></div>
      </div>
    </div>
  );
};

export default DashboardLoader;