import React from 'react';
import { withRouter } from 'react-router-dom';
import { Failure } from '../../components/payment/Failure';

const FailurePage: React.FC = () => {
  return <Failure title="Araka | Failed Transaction" />;
};

export default withRouter(FailurePage);
