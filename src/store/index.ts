import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { paymentSaga } from './payment/sagas';
import { PaymentState, paymentReducer } from './payment';

export type ApplicationState = {
  payment: PaymentState;
  router: RouterState;
};

export const createRootReducer = (history: History) =>
  combineReducers({
    payment: paymentReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(paymentSaga)]);
}
