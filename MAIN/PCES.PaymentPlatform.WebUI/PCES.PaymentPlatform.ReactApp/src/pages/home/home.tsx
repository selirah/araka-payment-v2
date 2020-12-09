import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { Section } from '../../components/common/Section';
import { Nav } from '../../components/common/Nav';
import { Carousel } from '../../components/home/Carousel';
import { PaymentOptions } from '../../components/home/PaymentOptions';
import { ColumnPadding } from '../../components/common/ColumnPadding';
import { GetStarted } from '../../components/home/GetStarted';
import { Footer } from '../../components/common/Footer';
import { AppDispatch } from '../../helpers/appDispatch';
import { fetchCategories } from '../../store/home/actions';
import { ICategory } from '../../models/ICategory';
import { isEmpty } from '../../helpers/isEmpty';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const home = appSelector((state) => state.home);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { categories } = home;
    if (!isEmpty(categories)) {
      setCategories(categories);
    }
  }, [home]);

  return (
    <React.Fragment>
      <Section>
        <Nav />
        <Carousel />
      </Section>
      <Section>
        {!isEmpty(categories) ? (
          <PaymentOptions categories={categories} />
        ) : null}
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
