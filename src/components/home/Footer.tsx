import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../../images/Images';

const Footer: React.FC = () => {
  return (
    <section className="">
      <div className="container">
        <footer>
          <div className="row">
            <div className="col-md-4">
              <Link className="footer-brand" to="index.html">
                <img src={logo} width="40" alt="" />
                ARAKA
              </Link>
              <address className="mt-3">
                105 N 1st
                <br />
                St #429, San Jose,
                <br />
                CA 95113, USA
              </address>
              <ul className="list-unstyled text-white footer-social list-inline">
                <li className="list-inline-item">
                  <Link to="">
                    <i className="mdi mdi-facebook facebook"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">
                    <i className="mdi mdi-instagram instagram"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">
                    <i className="mdi mdi-twitter twitter"></i>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="#">
                    <i className="mdi mdi-linkedin linkedin"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2">
              <h5 className="footer-title">Products</h5>
              <div className="mt-4">
                <ul className="list-unstyled footer-list">
                  <li>
                    <Link to="">About Us</Link>
                  </li>
                  <li>
                    <Link to="">Pricing</Link>
                  </li>
                  <li>
                    <Link to="">Get Onboarded</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2">
              <h5 className="footer-title">Support</h5>
              <div className="mt-4">
                <ul className="list-unstyled text-white footer-list">
                  <li>
                    <Link to="">Contact</Link>
                  </li>
                  <li>
                    <Link to="">Terms &amp; Conditions</Link>
                  </li>
                  <li>
                    <Link to="">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="faq">FAQs</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <h5 className="footer-title">Developer &amp; Resources</h5>
              <div className="mt-4">
                <ul className="list-unstyled footer-list">
                  <li>
                    <Link to="">Plug n' Pay</Link>
                  </li>
                  <li>
                    <Link to="">API Documentation</Link>
                  </li>
                  <li>
                    <Link to="">Enterprise Business</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-note text-center">
            Copyright&copy;
            {new Date().getUTCFullYear()}. ARAKA Payment Platform. All rights
            reserved.
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
