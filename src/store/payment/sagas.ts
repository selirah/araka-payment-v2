import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { PaymentActionTypes } from './types';
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  processOrderSuccess,
  processOrderFailure,
} from './actions';
import { callApiGet, callApiPost } from '../../utils/api';

function* fetchCategories() {
  try {
    const res = yield call(callApiGet, 'payments/productcategories');
    yield put(fetchCategoriesSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(fetchCategoriesFailure(err.response.data));
    } else {
      yield put(fetchCategoriesFailure('An unknwon error occurred'));
    }
  }
}

function* processOrderRequest({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'payments/processrequest', payload);
    yield put(processOrderSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(processOrderFailure('An error occured during payment.'));
    } else {
      throw err;
    }
  }
}

function* watchFetchCategories() {
  yield takeEvery(PaymentActionTypes.FETCH_CATEGORIES, fetchCategories);
}

function* watchProcessOrderRequest() {
  yield takeEvery(PaymentActionTypes.SUBMIT_ORDER_REQUEST, processOrderRequest);
}

function* paymentSaga(): Generator {
  yield all([fork(watchFetchCategories), fork(watchProcessOrderRequest)]);
}

export { paymentSaga };
