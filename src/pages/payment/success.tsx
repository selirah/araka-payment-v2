import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Success } from '../../components/payment/Success';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../helpers/appDispatch';
import { clearMobileStates } from '../../store/payment';

const SuccessPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMobileStates());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Success title="Araka | Successful Transaction" />;
};

export default withRouter(SuccessPage);
