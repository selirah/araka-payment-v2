import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { HeadTag } from '../common/HeadTag';
import { NavLayout } from './NavLayout';
import { PageContainer } from './PageContainer';
import { PaymentTypes } from './PaymentTypes';
import { Help } from './Help';
import { AppState } from 'interfaces/AppState';
import { Category } from 'interfaces/Category';
import { Spinner } from '../common/Spinner';
import { DisplayHeader } from '../common/DisplayHeader';
import { isEmpty } from 'utils/isEmpty';
import { Providers } from './Providers';
import { Details } from './Details';
import { Summary } from './Summary';

type Props = {
  title?: string;
};

const selectFromStore = createSelector(
  (state: AppState) => state.categories,
  (state: AppState) => state.loading,
  (state: AppState) => state.error,
  (state: AppState) => state.step,
  (categories, loading, error, step) => ({ categories, loading, error, step })
);

const Layout: React.FC<Props> = ({ title }) => {
  const { categories, loading, step } = useSelector(selectFromStore);
  const [spinner, setSpinner] = useState<boolean>(loading);
  const [categoryData, setCategoryData] = useState<Category[]>(categories);
  const [mainTitle, setMainTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [smallText, setSmallText] = useState<string>('');

  useEffect(() => {
    setSpinner(loading);
    setCategoryData(categories);

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
    }
  }, [loading, categories, step]);

  let render: any;
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
  }

  return (
    <section className="payment-app">
      <HeadTag title={title} />
      <NavLayout />
      <PageContainer>
        {subTitle !== '' ? (
          <DisplayHeader h2={mainTitle} h4={subTitle} h6={smallText} />
        ) : null}

        {render}
      </PageContainer>
      <Help />
    </section>
  );
};

export { Layout };
