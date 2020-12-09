import React from 'react';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <RegisterForm history={history} />
    </React.Fragment>
  );
};

export default withRouter(RegisterPage);
