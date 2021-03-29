import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Layout } from '../../components/payment/Layout';
import { isEmpty } from '../../helpers/isEmpty';
import {
  fetchCategories,
  clearMobileStates /*resetTransaction*/,
} from '../../store/payment';
import { clearAuthState } from '../../store/auth';
import { getCurrencies } from '../../store/dashboard';

const PaymentPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categories, loading } = appSelector((state) => state.payment);
  const { currencies } = appSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(clearMobileStates());
    dispatch(clearAuthState());
    if (isEmpty(categories) && !loading) {
      dispatch(fetchCategories());
    }
    if (isEmpty(currencies)) {
      dispatch(getCurrencies());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Layout title="Araka | Making Payments" />;
};

export default withRouter(PaymentPage);
