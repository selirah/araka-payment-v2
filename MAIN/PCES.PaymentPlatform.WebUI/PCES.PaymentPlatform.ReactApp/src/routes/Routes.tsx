import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Login } from '../pages/auth/login';
import { Register } from '../pages/auth/register';
import { ForgottenPassword } from '../pages/auth/forgotten-password';
import { Home } from '../pages/home/home';
import { Dashboard } from '../pages/dashboard/dashboard';

const Routes: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Route
          exact
          path="/auth/forgotten-password"
          component={ForgottenPassword}
        />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
