import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Cancelled } from '../../components/payment/Cancelled';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../helpers/appDispatch';
import { clearMobileStates } from '../../store/payment';

const CancelledPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMobileStates());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Cancelled title="Araka | Cancelled Transaction" />;
};

export default withRouter(CancelledPage);
