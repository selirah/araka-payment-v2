import React, { useEffect } from 'react';
import { withTranslation } from '../i18n';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { Layout } from '../components/home/Layout';
import { fetchCategories } from 'store-house/payment/actions';

const IndexPage: NextPage = () => {
  const dispatch = useDispatch();

  // we fetch the categories is fetched behind the scenes
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return <Layout title="Araka | Payment Platform" />;
};

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'layout'],
});

export default withTranslation('common')(IndexPage);
