import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { paymentSaga } from './payment/sagas';
import { authSaga } from './auth/sagas';

import { PaymentState, paymentReducer } from './payment';
import { AuthState, authReducer } from './auth';
import storage from 'redux-persist/lib/storage';

export type ApplicationState = {
  payment: PaymentState;
  auth: AuthState;
  router: RouterState;
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['payment', 'auth', 'router'],
};

export const persistingReducer = (history: History) =>
  persistReducer(
    persistConfig,
    combineReducers({
      payment: paymentReducer,
      auth: authReducer,
      router: connectRouter(history),
    })
  );

export function* rootSaga() {
  yield all([fork(paymentSaga), fork(authSaga)]);
}
