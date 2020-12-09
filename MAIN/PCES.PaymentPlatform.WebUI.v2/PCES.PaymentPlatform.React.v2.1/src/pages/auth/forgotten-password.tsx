import React from 'react';
import { withRouter } from 'react-router-dom';
import { ForgottenPasswordForm } from '../../components/auth/ForgottenPasswordForm';

const ForgottenPasswordPage: React.FC = () => {
  return (
    <React.Fragment>
      <ForgottenPasswordForm />
    </React.Fragment>
  );
};

export default withRouter(ForgottenPasswordPage);
