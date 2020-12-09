import React from 'react';
import { withRouter } from 'react-router-dom';
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

export default withRouter(LoginPage);
