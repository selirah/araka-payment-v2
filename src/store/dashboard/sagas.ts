import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { DashboardTypes } from './types';
import { getTransactionsSuccess, getTransactionsFailure } from './actions';
import { callApiGet } from '../../utils/api';

function* getTransactions() {
  try {
    const res = yield call(callApiGet, 'payments/transactionhistory');
    yield put(getTransactionsSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(getTransactionsFailure(err.response.data));
    } else {
      yield put(getTransactionsFailure('An unknwon error occurred'));
    }
  }
}

function* watchGetTransactions() {
  yield takeEvery(DashboardTypes.GET_TRANSACTIONS, getTransactions);
}

function* dashboardSaga(): Generator {
  yield all([fork(watchGetTransactions)]);
}

export { dashboardSaga };
