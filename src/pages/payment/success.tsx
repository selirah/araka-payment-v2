import React from 'react';
import { withRouter } from 'react-router-dom';
import { Success } from '../../components/payment/Success';

const SuccessPage: React.FC = () => {
  return <Success title="Araka | Successful Transaction" />;
};

export default withRouter(SuccessPage);
