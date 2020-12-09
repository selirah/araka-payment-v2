import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { HomeActionTypes } from './types';
import {
  fetchCategoriesSuccess,
  fetchCategoriesError,
  fetchProductsSuccess,
  fetchProductsError,
  fetchProducts,
  processOrderSuccess,
  processOrderError,
} from './actions';
import { callApiGet, callApiPost } from '../../utils/api';

function* fetchCategories() {
  try {
    const res = yield call(callApiGet, 'payments/categories');
    yield put(fetchCategoriesSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(fetchCategoriesError(err.response.data));
    } else {
      yield put(fetchCategoriesError('An unknwon error occurred'));
    }
  }
}

function* fetchMerchantProducts(action: ReturnType<typeof fetchProducts>) {
  try {
    const res = yield call(
      callApiGet,
      `payments/merchantproducts/${action.payload.categoryId}/${action.payload.merchantId}`
    );
    yield put(fetchProductsSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(fetchProductsError(err.response.data));
    } else {
      yield put(fetchProductsError('An unknwon error occurred'));
    }
  }
}

function* processOrderRequest({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'payments/processrequest', payload);
    yield put(processOrderSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(processOrderError(err.response.data));
    } else {
      throw err;
    }
  }
}

function* watchFetchCategories() {
  yield takeEvery(HomeActionTypes.FETCH_CATEGORIES, fetchCategories);
}

function* watchFetchProducts() {
  yield takeEvery(HomeActionTypes.FETCH_PRODUCTS, fetchMerchantProducts);
}

function* watchProcessOrderRequest() {
  yield takeEvery(HomeActionTypes.PROCESS_ORDER_REQUEST, processOrderRequest);
}

function* homeSaga() {
  yield all([
    fork(watchFetchCategories),
    fork(watchFetchProducts),
    fork(watchProcessOrderRequest),
  ]);
}

export default homeSaga;
