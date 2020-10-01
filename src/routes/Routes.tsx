import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import IndexPage from '../pages/_index';
import PaymentPage from '../pages/payment/payment';
import SuccessPage from '../pages/payment/success';
import FailurePage from '../pages/payment/failure';
import CancelledPage from '../pages/payment/cancelled';
import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';
import RegisterSuccessPage from '../pages/auth/register-success';
import EmailVerificationPage from '../pages/auth/email-verification';
import ForgottenPasswordPage from '../pages/auth/forgotten-password';
import DashboardPage from '../pages/dashboard/dashboard';
import NotFoundPage from '../pages/_404';
import { path } from '../helpers/path';

const Routes: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={path.home} component={IndexPage} />
        <Route exact path={path.payment} component={PaymentPage} />
        <Route exact path={path.login} component={LoginPage} />
        <Route exact path={path.register} component={RegisterPage} />
        <Route
          exact
          path={path.registerSuccess}
          component={RegisterSuccessPage}
        />
        <Route exact path={path.verify} component={EmailVerificationPage} />
        <Route exact path={path.forgot} component={ForgottenPasswordPage} />

        <PrivateRoute exact path={path.dashboard} component={DashboardPage} />
        <PrivateRoute exact path={path.success} component={SuccessPage} />
        <PrivateRoute exact path={path.failure} component={FailurePage} />
        <PrivateRoute exact path={path.cancelled} component={CancelledPage} />

        <Route exact component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
