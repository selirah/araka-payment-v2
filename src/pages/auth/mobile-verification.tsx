import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { MobileVerification } from '../../components/auth/MobileVerification';

const MobileVerificationPage: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const processId = query.get('PID');
  return (
    <React.Fragment>
      <MobileVerification processId={processId} />
    </React.Fragment>
  );
};

export default withRouter(MobileVerificationPage);