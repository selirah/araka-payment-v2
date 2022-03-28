import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Failure } from '../../components/payment/Failure';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../helpers/appDispatch';
import { clearMobileStates } from '../../store/payment';

const FailurePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMobileStates());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Failure title="Araka | Failed Transaction" />;
};

export default withRouter(FailurePage);
