import React, { useState, useEffect } from 'react';
import { appSelector } from '../../helpers/appSelector';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { NavLayout } from './NavLayout';
import { PageContainer } from './PageContainer';
import { PaymentTypes } from './PaymentTypes';
import { Help } from './Help';
import { Reset } from './Reset';
import { Category } from '../../interfaces';
import { Spinner } from '../common/Spinner';
import { DisplayHeader } from '../common/DisplayHeader';
import { isEmpty } from '../../helpers/isEmpty';
import { Providers } from './Providers';
import { Details } from './Details';
import { Summary } from './Summary';
import { Pay } from './Pay';
import { Error } from '../common/Error';

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
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    setSpinner(loading);
    setCategoryData(categories);
    setError(orderError);

    switch (step) {
      case 1:
        setMainTitle(t('wizard.step-1.main-title'));
        setSubTitle(t('wizard.step-1.subtitle'));
        setSmallText(t('wizard.step-1.small-text'));
        break;
      case 2:
        setMainTitle('');
        setSubTitle(t('wizard.step-2.subtitle'));
        setSmallText(t('wizard.step-2.small-text'));
        break;
      case 3:
        setMainTitle('');
        setSubTitle('');
        setSmallText('');
        break;
      case 4:
        setMainTitle('');
        setSubTitle('');
        setSmallText('');
        break;
      case 5:
        setMainTitle('');
        setSubTitle(t('wizard.step-3.subtitle'));
        setSmallText(t('wizard.step-3.small-text'));
        break;
    }
  }, [loading, categories, step, orderError, t]);

  let render: React.ReactNode;

  if (spinner && isEmpty(categoryData)) {
    render = <Spinner />;
  } else if (!spinner && !isEmpty(categoryData) && step === 1) {
    render = <PaymentTypes categories={categoryData} />;
  } else if (!spinner && !isEmpty(categoryData) && step === 2) {
    render = <Providers />;
  } else if (!spinner && !isEmpty(categoryData) && step === 3) {
    render = <Details />;
  } else if (!spinner && !isEmpty(categoryData) && step === 4) {
    render = <Summary />;
  } else if (!spinner && !isEmpty(categoryData) && step === 5) {
    render = <Pay />;
  }

  return (
    <section className="payment-app">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavLayout />
      <PageContainer>
        {!isEmpty(error) ? <Error error={error} /> : null}
        {subTitle !== '' ? (
          <DisplayHeader h2={mainTitle} h4={subTitle} h6={smallText} />
        ) : null}

        {render}
      </PageContainer>
      <Help />
      <Reset />
    </section>
  );
};

export { Layout };
