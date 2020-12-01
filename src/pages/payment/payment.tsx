<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Layout } from '../../components/payment/Layout';
import { isEmpty } from '../../helpers/isEmpty';
import { fetchCategories, /*resetTransaction*/ } from '../../store/payment';
import { clearAuthState } from '../../store/auth';

const PaymentPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categories, loading } = appSelector((state) => state.payment);

  useEffect(() => {
    // dispatch(resetTransaction());
    dispatch(clearAuthState());
    if (isEmpty(categories) && !loading) {
      dispatch(fetchCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Layout title="Araka | Making Payments" />;
};

export default withRouter(PaymentPage);
=======
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Layout } from '../../components/payment/Layout';
import { isEmpty } from '../../helpers/isEmpty';
import { fetchCategories, /*resetTransaction*/ } from '../../store/payment';
import { clearAuthState } from '../../store/auth';

const PaymentPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categories, loading } = appSelector((state) => state.payment);

  useEffect(() => {
    // dispatch(resetTransaction());
    dispatch(clearAuthState());
    if (isEmpty(categories) && !loading) {
      dispatch(fetchCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Layout title="Araka | Making Payments" />;
};

export default withRouter(PaymentPage);
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
