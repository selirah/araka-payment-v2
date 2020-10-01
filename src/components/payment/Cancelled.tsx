import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Help } from './Help';
import { NavLayout } from './NavLayout';
import { PageContainer } from './PageContainer';
import { cancelledIcon } from '../../images/Images';

type Props = {
  title?: string;
};

const Cancelled: React.FC<Props> = ({ title }) => {
  const { t } = useTranslation();
  return (
    <section>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavLayout />
      <PageContainer>
        <div className="row justify-content-center">
          <div className="display-success-failure-cancel text-center">
            <h2>{t('wizard.cancelled.main')}</h2>
            <h4>{t('wizard.failure.sub')}</h4>

            <div className="display-icon">
              <img
                src={cancelledIcon}
                width="100"
                alt="success"
                className="icon-failure"
              />
              <h4>{t('wizard.cancelled.sub3')}</h4>
            </div>
            <div className="display-success-failure-cancel-buttons">
              <button className="btn">{t('wizard.cancelled.btn')}</button>
              <button className="btn">{t('wizard.cancelled.btn2')}</button>
            </div>
          </div>
        </div>
      </PageContainer>
      <Help />
    </section>
  );
};

export { Cancelled };
