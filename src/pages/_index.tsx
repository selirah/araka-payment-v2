import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { appSelector } from '../helpers/appSelector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../helpers/appDispatch';
import { Layout } from '../components/home/Layout';
import { fetchCategories, resetTransaction } from '../store/payment/actions';
import { slider } from '../helpers/slider';
import { isEmpty } from 'src/helpers/isEmpty';

const IndexPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categories } = appSelector((state) => state.payment);

  useEffect(() => {
    dispatch(resetTransaction());
    if (isEmpty(categories)) {
      dispatch(fetchCategories());
    }
    slider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Layout title="Araka | Payment Platform" />;
};

export default withRouter(IndexPage);
