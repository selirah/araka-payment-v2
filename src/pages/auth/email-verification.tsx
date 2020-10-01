import React from 'react';
import { useLocation } from 'react-router-dom';
import { EmailVerification } from '../../components/auth/EmailVerification';

const EmailVerificationPage: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const processId = query.get('PID');
  return (
    <React.Fragment>
      <EmailVerification processId={processId} />
    </React.Fragment>
  );
};

export default EmailVerificationPage;
