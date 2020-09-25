import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../helpers/appDispatch';
import { Layout } from '../components/home/Layout';
import { fetchCategories } from '../store/payment/actions';

const IndexPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return <Layout title="Araka | Payment Platform" />;
};

export default IndexPage;
