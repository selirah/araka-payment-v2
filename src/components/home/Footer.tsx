import React from 'react';

const Footer: React.FC = () => {
  return (
    <section className="">
      <div className="container">
        <footer>
          <div className="row">
            <div className="col-md-4">
              <a className="footer-brand" href="index.html">
                <img src="/img/araka/logo_symbol.png" width="40" />
                ARAKA
              </a>
              <address className="mt-3">
                105 N 1st
                <br />
                St #429, San Jose,
                <br />
                CA 95113, USA
              </address>
              <ul className="list-unstyled text-white footer-social list-inline">
                <li className="list-inline-item">
                  <a href="">
                    <i className="mdi mdi-facebook facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="mdi mdi-instagram instagram"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="mdi mdi-twitter twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="mdi mdi-linkedin linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2">
              <h5 className="footer-title">Products</h5>
              <div className="mt-4">
                <ul className="list-unstyled footer-list">
                  <li>
                    <a href="">About Us</a>
                  </li>
                  <li>
                    <a href="">Pricing</a>
                  </li>
                  <li>
                    <a href="">Get Onboarded</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2">
              <h5 className="footer-title">Support</h5>
              <div className="mt-4">
                <ul className="list-unstyled text-white footer-list">
                  <li>
                    <a href="">Contact</a>
                  </li>
                  <li>
                    <a href="">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="faq">FAQs</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <h5 className="footer-title">Developer &amp; Resources</h5>
              <div className="mt-4">
                <ul className="list-unstyled footer-list">
                  <li>
                    <a href="">Plug n' Pay</a>
                  </li>
                  <li>
                    <a href="">API Documentation</a>
                  </li>
                  <li>
                    <a href="">Enterprise Business</a>
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
