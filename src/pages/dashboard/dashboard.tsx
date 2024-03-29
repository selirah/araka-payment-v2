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
import {
  getTransactions,
  getCurrencies,
  clearTransactions,
} from '../../store/dashboard';
import { setRepeatTransaction, clearMobileStates } from '../../store/payment';
import { clearAuthState } from '../../store/auth';

const DashboardPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    transactions,
    loading,
    currencies,
    currenciesLoading,
    reloadTransaction,
  } = appSelector((state) => state.dashboard);

  const refresh = (): void => {
    dispatch(clearTransactions());
    dispatch(getTransactions());
  };

  useEffect(() => {
    dispatch(clearAuthState());
    dispatch(clearMobileStates());
    dispatch(setRepeatTransaction(false));
    if (isEmpty(transactions) && !loading) {
      dispatch(getTransactions());
    }
    if (reloadTransaction) {
      dispatch(getTransactions());
    }
    if (isEmpty(currencies) && !currenciesLoading) {
      dispatch(getCurrencies());
    }
    toggleSideNav();
    resizeWindow();
    unScrollWrapper();
    scrollToTop();
    smoothScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Layout title="Araka | Dashboard" refresh={refresh} />;
};

export default withRouter(DashboardPage);
