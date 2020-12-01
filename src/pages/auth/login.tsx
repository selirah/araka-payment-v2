<<<<<<< HEAD
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
=======
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
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
