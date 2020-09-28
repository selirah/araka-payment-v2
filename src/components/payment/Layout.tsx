import React, { useState, useEffect } from 'react';
import { appSelector } from '../../helpers/appSelector';
import { Helmet } from 'react-helmet';
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

  useEffect(() => {
    setSpinner(loading);
    setCategoryData(categories);
    setError(orderError);

    switch (step) {
      case 1:
        setMainTitle('Araka Welcomes You');
        setSubTitle('Which type of payment would you like to perform?');
        setSmallText('Select only one type');
        break;
      case 2:
        setMainTitle('');
        setSubTitle('Which provider would you like to choose?');
        setSmallText('Select only one payment method');
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
        setSubTitle(
          'Last thing - how would you like to pay for this transaction?'
        );
        setSmallText('Select only one type');
        break;
    }
  }, [loading, categories, step, orderError]);

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
