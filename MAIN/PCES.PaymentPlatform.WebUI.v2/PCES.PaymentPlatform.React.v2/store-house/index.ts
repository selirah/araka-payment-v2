import { all, fork } from 'redux-saga/effects';
import paymentSaga from './payment/sagas';

export function* rootSaga() {
  yield all([fork(paymentSaga)]);
}
