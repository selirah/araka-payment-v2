import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Nav } from '../components/home/Nav';
import { Footer } from '../components/home/Footer';
import { useTranslation } from 'react-i18next';

interface TermsProps {}

const TermsPage: React.FC<TermsProps> = () => {
  const { t } = useTranslation();

  return (
    <section
      className="home-page"
      data-spy="scroll"
      data-target="#navbarResponsive"
    >
      <Helmet>
        <title>Araka | Terms and Conditions</title>
      </Helmet>
      <Nav />
      <section className="card-section">
        <div className="container">
          <div className="row vertical-content">
            <div className="col-12 terms">
              <h2>{t('home.terms.conditions')}</h2>
              <p>{t('home.terms.intro')}</p>
              <h4>{t('home.terms.privacy')}</h4>
              <p>{t('home.terms.privacy_paragraph_1')}</p>
              <p>{t('home.terms.privacy_paragraph_2')}</p>
              <p>{t('home.terms.privacy_paragraph_3')}</p>
              <p>{t('home.terms.privacy_paragraph_4')}</p>
              <p>{t('home.terms.privacy_paragraph_5')}</p>
              <p>{t('home.terms.privacy_paragraph_6')}</p>
              <p>{t('home.terms.privacy_paragraph_7')}</p>
              <p>{t('home.terms.privacy_paragraph_8')}</p>
              <h4>{t('home.terms.information')}</h4>
              <p>{t('home.terms.information_paragraph_1')}</p>
              <p>{t('home.terms.information_paragraph_2')}</p>
              <h4>{t('home.terms.security')}</h4>
              <p>{t('home.terms.security_paragraph_1')}</p>
              <p>{t('home.terms.security_paragraph_2')}</p>
              <p>{t('home.terms.security_paragraph_3')}</p>
              <h4>{t('home.terms.consent')}</h4>
              <p>{t('home.terms.consent_paragraph')}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default withRouter(TermsPage);
