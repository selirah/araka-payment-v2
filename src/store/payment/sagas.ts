import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { PaymentActionTypes } from './types';
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  processOrderSuccess,
  processOrderFailure,
  postFeeSuccess,
  postFeeFailure,
} from './actions';
import { callApiGet, callApiPost } from '../../utils/api';

function* fetchCategories() {
  try {
    const res = yield call(callApiGet, 'payments/productcategories');
    if (res.status === 200) {
      yield put(fetchCategoriesSuccess(res.data));
    }
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

function* processFeeRequest({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'payments/getfees', payload);
    console.log(res);
    yield put(postFeeSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(
        postFeeFailure('An error occured when making request to server')
      );
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

function* watchPostFeeRequest() {
  yield takeEvery(PaymentActionTypes.REQUEST_FEE, processFeeRequest);
}

function* paymentSaga(): Generator {
  yield all([
    fork(watchFetchCategories),
    fork(watchProcessOrderRequest),
    fork(watchPostFeeRequest),
  ]);
}

export { paymentSaga };
