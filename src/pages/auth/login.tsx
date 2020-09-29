import React from 'react';
import { useHistory } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <LoginForm history={history} />
    </React.Fragment>
  );
};

export default LoginPage;
