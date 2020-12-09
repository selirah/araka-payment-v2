import React from 'react';
import { withRouter } from 'react-router-dom';
import { RegisterSuccess } from '../../components/auth/RegisterSuccess';

const RegisterSuccessPage: React.FC = () => {
  return (
    <React.Fragment>
      <RegisterSuccess />
    </React.Fragment>
  );
};

export default withRouter(RegisterSuccessPage);
