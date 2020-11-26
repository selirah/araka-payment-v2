import React from 'react';
import { withRouter } from 'react-router-dom';
import { Redirecting } from '../../components/payment/Redirecting';

const RedirectingPage: React.FC = () => {
  return <Redirecting title="Araka | Redirecting..." />;
};

export default withRouter(RedirectingPage);
