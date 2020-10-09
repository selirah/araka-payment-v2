import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Layout } from '../../components/dashboard/Layout';
import {
  toggleSideNav,
  resizeWindow,
  unScrollWrapper,
  scrollToTop,
  smoothScroll,
} from '../../helpers/dashboard';
import { isEmpty } from '../../helpers/isEmpty';
import { getTransactions } from '../../store/dashboard';
import { clearAuthState } from '../../store/auth';

const DashboardPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { transactions, loading } = appSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(clearAuthState());
    if (isEmpty(transactions) && !loading) {
      dispatch(getTransactions());
    }
    toggleSideNav();
    resizeWindow();
    unScrollWrapper();
    scrollToTop();
    smoothScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Layout title="Araka | Dashboard" />;
};

export default withRouter(DashboardPage);
