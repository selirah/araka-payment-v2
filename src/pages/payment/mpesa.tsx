import React from 'react';
import { withRouter } from 'react-router-dom';
import { MPESA } from '../../components/payment/MPESA';

const MPESAPage: React.FC = () => {
  return <MPESA title="Araka | mPESA Option" />;
};

export default withRouter(MPESAPage);
