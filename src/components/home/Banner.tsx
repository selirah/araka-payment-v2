import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { path } from '../../helpers/path';

const Banner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="banner">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h2 className="banner-text">{t('home.banner-header')}</h2>
            <p className="banner-text">
              <span>Araka</span> {t('home.banner-text')} <span>M-PESA</span>{' '}
              &bull; <span>AirtelMoney</span> {t('home.and')}{' '}
              <span>OrangeMoney</span>
            </p>
            <div className="btn-links banner-text">
              <Link to={path.register}>
                <button className="btn">{t('home.btn-merchant')}</button>
              </Link>
              <Link to={path.payment}>
                <button className="btn">{t('home.btn-payments')}</button>
              </Link>
            </div>
          </div>
          <div className="col-sm-6"></div>
        </div>
      </div>
    </section>
  );
};
export { Banner };
