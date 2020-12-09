import React from 'react';
import { useTranslation } from 'react-i18next';
import { Options } from './Options';
import { ICategory } from '../../models/ICategory';
// import { Categories } from '../../mock/Categories'; // mock data..remove it later

const PaymentOptions: React.FC<{ categories: ICategory[] }> = ({
  categories,
}) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="bg-gray container-fluid">
        <div className="container-fluid page-padding">
          <div className="col-12 col-sm-12 text-center">
            <h3 className="heading">{t('home.welcome')}</h3>
            <h6 className="options gray-light-text">{t('home.option')}</h6>
            <div className="heading-underline"></div>
          </div>
          <div className="row bg-white">
            <Options categories={categories} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { PaymentOptions };
