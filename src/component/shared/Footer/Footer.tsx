import '../../../css/shared/Footer/Footer.css';

const Footer = () => {
  return (
    <div className="pg-footer">
      <footer className="pg-footer">
        <div className="pg-footer-content">
          <div className="pg-footer-content-column">
            <div className="pg-footer-logo">
              <a className="pg-footer-logo-link" href="#">
                <span className="pg-hidden-link-text">LOGO</span>
                <h1>LOGO</h1>
              </a>
            </div>
            <div className="pg-footer-menu">
              <h2 className="pg-footer-menu-name">Get Started</h2>
              <ul className="pg-footer-menu-list">
                <li>
                  <a href="#">Start</a>
                </li>
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">Installation</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pg-footer-content-column">
            <div className="pg-footer-menu">
              <h2 className="pg-footer-menu-name">Company</h2>
              <ul className="pg-footer-menu-list">
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">News</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pg-footer-content-column">
            <div className="pg-footer-menu">
              <h2 className="pg-footer-menu-name">Quick Links</h2>
              <ul className="pg-footer-menu-list">
                <li>
                  <a href="#">Support Center</a>
                </li>
                <li>
                  <a href="#">Service Status</a>
                </li>
                <li>
                  <a href="#">Security</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pg-footer-content-column">
            <div className="pg-footer-call-to-action">
              <h2 className="pg-footer-call-to-action-title">Let&apos;s Chat</h2>
              <p className="pg-footer-call-to-action-description">
                Have a support question?
              </p>
              <a className="pg-footer-call-to-action-button" href="#">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
        <div className="pg-footer-copyright">
          <p className="pg-footer-copyright-text">
            ©2025. | Designed By: Md Mahfuz Anam Tasnim. | All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
