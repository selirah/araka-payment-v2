import React from 'react';
import { withRouter } from 'react-router-dom';
import { ResendVerificationForm } from '../../components/auth/ResendVerificationForm';

const ResendVerificationPage: React.FC = () => {
  return (
    <React.Fragment>
      <ResendVerificationForm />
    </React.Fragment>
  );
};

export default withRouter(ResendVerificationPage);
