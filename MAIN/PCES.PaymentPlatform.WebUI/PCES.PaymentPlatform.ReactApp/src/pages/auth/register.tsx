import React from 'react';
import { useHistory } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';

const Register: React.FC = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <RegisterForm history={history} />
    </React.Fragment>
  );
};

export { Register };
