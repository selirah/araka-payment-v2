<<<<<<< HEAD
import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
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

export default withRouter(EmailVerificationPage);
=======
import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
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

export default withRouter(EmailVerificationPage);
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
