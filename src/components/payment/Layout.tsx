import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appSelector } from '../../helpers/appSelector';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { NavLayout } from './NavLayout';
import { ProcessWizard } from './ProcessWizard';
import { PageContainer } from './PageContainer';
import { PaymentTypes } from './PaymentTypes';
import { Help } from './Help';
import { Reset } from './Reset';
import { Category } from '../../interfaces';
import { Spinner } from '../common/Spinner';
import { DisplayHeader } from './DisplayHeader';
import { isEmpty } from '../../helpers/isEmpty';
import { Providers } from './Providers';
import { Details } from './Details';
import { Summary } from './Summary';
import { Pay } from './Pay';
import { Error } from '../common/Error';
import 'react-perfect-scrollbar/dist/css/styles.css';

type Props = {
  title?: string;
};

const Layout: React.FC<Props> = ({ title }) => {
  const { categories, loading, step, orderError } = appSelector(
    (state) => state.payment
  );
  const [spinner, setSpinner] = useState<boolean>(loading);
  const [categoryData, setCategoryData] = useState<Category[]>(categories);
  const [mainTitle, setMainTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [smallText, setSmallText] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    setSpinner(loading);
    setCategoryData(categories);
    setError(orderError);

    switch (step) {
      case 1:
        setMainTitle(t('wizard.step-1.main-title'));
        setSubTitle(t('wizard.step-1.subtitle'));
        setSmallText(t('wizard.step-1.small-text'));
        setClassName('');
        break;
      case 2:
        setMainTitle('');
        setSubTitle(t('wizard.step-2.subtitle'));
        setSmallText(t('wizard.step-2.small-text'));
        setClassName('');
        break;
      case 3:
        setMainTitle('');
        setSubTitle('All Fields are required');
        setSmallText('');
        setClassName('valid-info');
        break;
      case 4:
        setMainTitle('');
        setSubTitle('');
        setSmallText('');
        setClassName('');
        break;
      case 5:
        setMainTitle('');
        setSubTitle(t('wizard.step-3.subtitle'));
        setSmallText(t('wizard.step-3.small-text'));
        setClassName('');
        break;
    }
  }, [loading, categories, step, orderError, t]);

  let render: React.ReactNode;

  if (spinner && isEmpty(categoryData)) {
    render = <Spinner />;
  } else {
    switch (step) {
      case 1:
        render = <PaymentTypes categories={categoryData} />;
        break;
      case 2:
        render = <Providers />;
        break;
      case 3:
        render = <Details />;
        break;
      case 4:
        render = <Summary />;
        break;
      case 5:
        render = <Pay />;
        break;
    }
  }

  let paymentOptions: React.ReactNode;

  if (!isEmpty(categoryData) && categoryData !== []) {
    paymentOptions = categoryData.map((c) => (
      <li
        className={`nav-link ${
          c.productCategoryId === active ? 'active' : null
        }`}
        key={c.productCategoryId}
        onClick={() => setActive(c.productCategoryId)}
        style={{ cursor: 'pointer' }}
      >
        <Link to="#">{c.name}</Link>
      </li>
    ));
  }

  return (
    <section className="payment-app">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavLayout>
        <ProcessWizard />
      </NavLayout>
      <PageContainer>
        <div className="card">
          {!isEmpty(error) ? <Error error={error} /> : null}
          <div className="card-body wizard-card my-5">
            <div className="row">
              <div className="col-md-3">
                <ul
                  className="nav d-flex nav-pills wizard-nav"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <li className="nav-link search-nav">
                    <div className="search">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control bg-light small"
                          placeholder={t('dashboard.old-user.search')}
                        />
                      </div>
                    </div>
                  </li>
                  <li
                    className={`nav-link ${0 === active ? 'active' : null}`}
                    onClick={() => setActive(0)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Link to="#">All Payment Types</Link>
                  </li>
                  {paymentOptions}
                </ul>
              </div>
              <div className="col-md-9">
                {subTitle !== '' ? (
                  <DisplayHeader
                    h2={mainTitle}
                    h4={subTitle}
                    h6={smallText}
                    className={className}
                  />
                ) : null}
                {render}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
      <Help />
      <Reset />
    </section>
  );
};

export { Layout };
