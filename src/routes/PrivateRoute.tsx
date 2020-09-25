import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { appSelector } from '../helpers/appSelector';

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  // const auth = appSelector((state) => state.auth);
  // const { isAuthenticated } = auth;

  return (
    <React.Fragment>
      {/* <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/auth/login" />
          )
        }
      /> */}
      <h1>hey</h1>
    </React.Fragment>
  );
};

export { PrivateRoute };
