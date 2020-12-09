import React from 'react';
import { useTranslation } from 'react-i18next';

const GetStarted: React.FC = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="container-fluid page-padding bg-white">
        <div className="col-12 text-center">
          <h3 className="heading-get-started">{t('home.get_started')}</h3>
          <div className="heading-underline"></div>
          <p className="lead">{t('home.get_started_paragraph')}</p>
          <a
            className="btn btn-secondary-custom btn-md"
            href="/"
            target="_blank"
          >
            {t('nav_links.how_it_works')}
          </a>
        </div>
        <div className="row padding"></div>
      </div>
    </React.Fragment>
  );
};

export { GetStarted };
