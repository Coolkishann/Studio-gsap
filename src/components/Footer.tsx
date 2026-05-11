import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-background">
      </div>

      <div className="footer-glow"></div>

      {/* Top Section */}
      <div className="footer-top">
        <span className="footer-tagline">Lets Make A Impact Together</span>
        <a href="https://studio.com" className="footer-domain">STUDIO.COM</a>
      </div>

      {/* Middle Section - Big Brand Text */}
      <div className="footer-middle">
        <h2 className="footer-main-brand" style={{ fontFamily: '"Playfair Display", serif' }}>
          STUDIO
          <span className="footer-copyright-symbol">©</span>
        </h2>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span className="footer-year">© 2026.STUDIO</span>
        </div>

        <div className="footer-bottom-right">
          <div className="footer-company-info">
            <p className="footer-company-name">
              Creative Visual Solutions & Modern Video Production Studio
            </p>
            <div className="footer-logo">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
                <path d="M50 2L50 98" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                <path d="M2 50L98 50" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                <ellipse cx="50" cy="50" rx="30" ry="48" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
              </svg>
            </div>
          </div>

          <div className="footer-links-grid">
            <a href="#team" className="footer-link">Team</a>
            <a href="#terms" className="footer-link">Terms</a>
            <a href="#research" className="footer-link">Research</a>
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>
        </div>
      </div>

      {/* Import the Google Font for the brand text */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
      `}</style>
    </footer>
  );
};

export default Footer;
