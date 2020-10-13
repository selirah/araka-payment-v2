import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { DashboardTypes } from './types';
import {
  getTransactionsSuccess,
  getTransactionsFailure,
  getCurrenciesSuccess,
  getCurrenciesFailure,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  updateUserSuccess,
  updateUserFailure,
} from './actions';
import { callApiGet, callApiPost } from '../../utils/api';
import { Client } from '../../interfaces';

function* getTransactions() {
  try {
    const res = yield call(callApiGet, 'payments/transactionhistory');
    if (res.status === 200) {
      yield put(getTransactionsSuccess(res.data));
    } else {
      yield put(getTransactionsFailure('An unknwon error occurred'));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(getTransactionsFailure(err.response.data));
    } else {
      yield put(getTransactionsFailure('An unknwon error occurred'));
    }
  }
}

function* getCurrencies() {
  try {
    const res = yield call(callApiGet, 'payments/currencycodes');
    if (res.status === 200) {
      yield put(getCurrenciesSuccess(res.data));
    } else {
      yield put(getCurrenciesFailure('An unknwon error occurred'));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(getCurrenciesFailure(err.response.data));
    } else {
      yield put(getCurrenciesFailure('An unknwon error occurred'));
    }
  }
}

function* getUser({ payload }: { type: string; payload: number }) {
  try {
    const res = yield call(callApiGet, `payments/clientdetails/${payload}`);
    if (res.status === 200) {
      yield put(getCurrentUserSuccess(res.data));
    } else {
      yield put(getCurrentUserFailure('An unknwon error occurred'));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(getCurrentUserFailure(err.response.data));
    } else {
      yield put(getCurrentUserFailure('An unknwon error occurred'));
    }
  }
}

function* updateUser({ payload }: { type: string; payload: Client }) {
  try {
    const res = yield call(callApiPost, `payments/clientdetails`, payload);
    if (res.status === 200) {
      yield put(updateUserSuccess(res.data));
    } else {
      yield put(updateUserFailure(res.data));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(updateUserFailure(err.response.data));
    } else {
      yield put(updateUserFailure('An unknwon error occurred'));
    }
  }
}

function* watchGetTransactions() {
  yield takeEvery(DashboardTypes.GET_TRANSACTIONS, getTransactions);
}

function* watchGetCurrencies() {
  yield takeEvery(DashboardTypes.GET_CURRENCIES, getCurrencies);
}

function* watchGetUser() {
  yield takeEvery(DashboardTypes.GET_CURRENT_USER, getUser);
}

function* watchUpdateUser() {
  yield takeEvery(DashboardTypes.EDIT_ACCOUNT_REQUEST, updateUser);
}

function* dashboardSaga(): Generator {
  yield all([
    fork(watchGetTransactions),
    fork(watchGetCurrencies),
    fork(watchGetUser),
    fork(watchUpdateUser),
  ]);
}

export { dashboardSaga };
