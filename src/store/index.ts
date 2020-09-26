import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { paymentSaga } from './payment/sagas';
import { authSaga } from './auth/sagas';

import { PaymentState, paymentReducer } from './payment';
import { AuthState, authReducer } from './auth';

export type ApplicationState = {
  payment: PaymentState;
  auth: AuthState;
  router: RouterState;
};

export const createRootReducer = (history: History) =>
  combineReducers({
    payment: paymentReducer,
    auth: authReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(paymentSaga), fork(authSaga)]);
}
