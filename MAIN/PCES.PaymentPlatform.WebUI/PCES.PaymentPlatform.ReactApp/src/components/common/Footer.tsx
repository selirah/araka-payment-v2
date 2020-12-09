import React from 'react';
import { logoFooter } from '../../images/Images';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <footer>
        <div className="container-fluid footer-padding">
          <div className="row pt-5">
            <div className="col-md-4">
              <img src={logoFooter} alt="logo" className="logo-dark" />
              <p className="footer-desc mt-3">{t('footer.slogan')}</p>
              <ul className="list-unstyled text-white footer-social list-inline">
                <li className="list-inline-item">
                  <a href="/">
                    <i className="mdi mdi-facebook facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/">
                    <i className="mdi mdi-instagram instagram"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/">
                    <i className="mdi mdi-twitter twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/">
                    <i className="mdi mdi-linkedin linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2">
              <h5 className="footer-title">{t('footer.location')}</h5>
              <div className="mt-4">
                <ul className="list-unstyled footer-list">
                  <li>
                    <a href="/">{t('footer.about_us')}</a>
                  </li>
                  <li>
                    <a href="/">{t('footer.get_onboarded')}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2">
              <h5 className="footer-title">{t('footer.support')}</h5>
              <div className="mt-4">
                <ul className="list-unstyled text-white footer-list">
                  <li>
                    <a href="/">{t('footer.contact')}</a>
                  </li>
                  <li>
                    <a href="/">{t('footer.privacy_policy')}</a>
                  </li>
                  <li>
                    <a href="/">{t('footer.faqs')}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <h5 className="footer-title">{t('footer.locate_us')}</h5>
              <div className="mt-4">
                <ul className="list-unstyled footer-list">
                  <li>
                    <a href="tel:+14087809070">
                      <i className="mdi mdi-cellphone-android"></i>
                      &nbsp;&nbsp;+1 408-780-9070
                    </a>
                  </li>
                  <li>
                    <a href="mailto:contact@segladigital.com">
                      <i className="mdi mdi-email"></i>&nbsp;&nbsp;info@info.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://maps.google.com/?q=105 N 1st St #429, San Jose, CA 95113, USA"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="mdi mdi-map-marker"></i>&nbsp;&nbsp;105 N
                      1st St #429, San Jose, CA 95113, USA
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-note text-center">
            <hr className="socket" />
            {t('footer.copyright')} &copy;
            {new Date().getUTCFullYear()} {t('footer.payment_platform')}.{' '}
            {t('footer.all_rights')}
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export { Footer };
