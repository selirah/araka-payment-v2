import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import IndexPage from '../pages/index';
import PaymentPage from '../pages/payment/payment';
import { path } from '../helpers/path';

const Routes: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path.home} component={IndexPage} />
        <Route exact path={path.payment} component={PaymentPage} />
        {/* <Route exact path="/auth/register" component={Register} />
        <Route
          exact
          path="/auth/forgotten-password"
          component={ForgottenPassword}
        />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
