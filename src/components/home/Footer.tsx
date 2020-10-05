import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { logo, pcesLogo } from '../../images/Images';

const Footer: React.FC = () => {
  const { t } = useTranslation();
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
                3rd Floor, Opeibea House,
                <br />
                37 Liberation Road,
                <br />
                Acra, Ghana
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
              <h5 className="footer-title">{t('footer.products')}</h5>
              <div className="mt-4">
                <ul className="list-unstyled footer-list">
                  <li>
                    <Link to="">{t('footer.about-us')}</Link>
                  </li>
                  <li>
                    <Link to="">{t('footer.pricing')}</Link>
                  </li>
                  <li>
                    <Link to="">{t('footer.get-onboarded')}</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2">
              <h5 className="footer-title">{t('footer.support')}</h5>
              <div className="mt-4">
                <ul className="list-unstyled text-white footer-list">
                  <li>
                    <Link to="">{t('footer.contact')}</Link>
                  </li>
                  <li>
                    <Link to="">{t('footer.terms')}</Link>
                  </li>
                  <li>
                    <Link to="">{t('footer.privacy-policy')}</Link>
                  </li>
                  <li>
                    <Link to="faq">{t('footer.faq')}</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <h5 className="footer-title">{t('footer.developer')}</h5>
              <div className="mt-4">
                <ul className="list-unstyled footer-list">
                  <li>
                    <Link to="">{t('footer.plug')}</Link>
                  </li>
                  <li>
                    <Link to="">{t('footer.api')}</Link>
                  </li>
                  <li>
                    <Link to="">{t('footer.enterprise')}</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-note text-center">
            {t('footer.copy')}&copy;
            {new Date().getUTCFullYear()}. ARAKA {t('footer.rights')}. POWERED{' '}
            BY <img src={pcesLogo} alt="logo" width="70" />
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
