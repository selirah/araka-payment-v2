import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../helpers/appDispatch';
import { Help } from './Help';
import { NavLayout } from './NavLayout';
import { PageContainer } from './PageContainer';
import { cancelledIcon } from '../../images/Images';
import { path } from '../../helpers/path';
import { reloadTransactions } from '../../store/dashboard';

type Props = {
  title?: string;
};

const Cancelled: React.FC<Props> = ({ title }) => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const viewHistory = () => {
    dispatch(reloadTransactions(true));
    history.push(path.dashboard);
  };

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
                alt="failure"
                className="icon-failure"
              />
              {/* <h4>{t('wizard.cancelled.sub3')}</h4> */}
            </div>
            <div className="display-success-failure-cancel-buttons">
              <button className="btn btn-history" onClick={() => viewHistory()}>
                {t('wizard.cancelled.btn')}
              </button>
              <Link to={path.payment}>
                <button className="btn btn-new-payment">
                  {t('wizard.cancelled.btn2')}
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

export { Cancelled };
