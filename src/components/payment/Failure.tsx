import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Help } from './Help';
import { NavLayout } from './NavLayout';
import { PageContainer } from './PageContainer';
import { failedIcon } from '../../images/Images';
import { path } from '../../helpers/path';

type Props = {
  title?: string;
};

const Failure: React.FC<Props> = ({ title }) => {
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
            <h2>{t('wizard.failure.main')}</h2>
            <h4>{t('wizard.failure.sub')}</h4>
            <h5>{t('wizard.failure.sub2')}</h5>
            <div className="display-icon">
              <img
                src={failedIcon}
                width="100"
                alt="success"
                className="icon-failure"
              />
              {/* <h4>{t('wizard.failure.sub3')}</h4> */}
            </div>
            <div className="display-success-failure-cancel-buttons">
              <Link to={path.dashboard}>
                <button className="btn btn-history">
                  {t('wizard.failure.btn')}
                </button>
              </Link>
              <Link to={path.payment}>
                <button className="btn btn-new-payment">
                  {t('wizard.failure.btn2')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
      <Help />
    </section>
  );
};

export { Failure };
