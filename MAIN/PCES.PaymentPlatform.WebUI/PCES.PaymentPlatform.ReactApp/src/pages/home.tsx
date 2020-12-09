import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Section } from '../components/common/Section';
import { Nav } from '../components/common/Nav';
import { Carousel } from '../components/home/Carousel';
import { PaymentOptions } from '../components/home/PaymentOptions';
import { ColumnPadding } from '../components/common/ColumnPadding';
import { GetStarted } from '../components/home/GetStarted';
import { Footer } from '../components/common/Footer';
import { AppDispatch } from '../helpers/appDispatch';
import { fetchCategories } from '../store/home/actions';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Section>
        <Nav />
        <Carousel />
      </Section>
      <Section>
        <PaymentOptions />
      </Section>
      <ColumnPadding />
      <Section>
        <GetStarted />
      </Section>
      <Section>
        <Footer />
      </Section>
    </React.Fragment>
  );
};

export { Home };
