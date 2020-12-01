import React from 'react';
import { withRouter } from 'react-router-dom';
import { Cancelled } from '../../components/payment/Cancelled';

const CancelledPage: React.FC = () => {
  return <Cancelled title="Araka | Cancelled Transaction" />;
};

export default withRouter(CancelledPage);
