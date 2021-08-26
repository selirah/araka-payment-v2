import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { PaymentActionTypes } from './types'
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  processOrderSuccess,
  processOrderFailure,
  postFeeSuccess,
  postFeeFailure,
  checkMobileStatusSuccess,
  checkMobileStatusFailure,
  getProvidersSuccess,
  getProvidersFailure,
  mobilePaymentSuccess,
  mobilePaymentFailure,
  paymentSuccess,
  paymentFailure
} from './actions'
import { callApiGet, callApiPost } from '../../utils/api'

function* fetchCategories(): any {
  try {
    const res = yield call(callApiGet, 'payments/productcategories')
    if (res.status === 200) {
      yield put(fetchCategoriesSuccess(res.data))
    }
  } catch (err) {
    if (err && err.response) {
      yield put(fetchCategoriesFailure(err.response.data))
    } else {
      yield put(fetchCategoriesFailure('An unknwon error occurred'))
    }
  }
}

function* processOrderRequest({
  payload
}: {
  type: string
  payload: any
}): any {
  try {
    const res = yield call(callApiPost, 'payments/processrequest', payload)
    yield put(processOrderSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(processOrderFailure('An error occured during payment.'))
    } else {
      throw err
    }
  }
}

function* processFeeRequest({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'payments/getfees', payload)
    if (res.status === 200) {
      yield put(postFeeSuccess(res.data))
    } else {
      yield put(postFeeFailure(res.data))
    }
  } catch (err) {
    if (err && err.response) {
      yield put(
        postFeeFailure('An error occured when making request to server')
      )
    } else {
      throw err
    }
  }
}

function* mobilePayment({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'payments/processmobilewallet', payload)
    yield put(mobilePaymentSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(mobilePaymentFailure('An error occured during payment.'))
    } else {
      throw err
    }
  }
}

function* mobileStatus({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(
      callApiGet,
      `payments/gettransactionstatus/${payload}`
    )
    yield put(checkMobileStatusSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(checkMobileStatusFailure('An error occured during payment.'))
    } else {
      throw err
    }
  }
}

function* getProviders(): any {
  try {
    const res = yield call(callApiGet, 'payments/getmobilewalletproviders')
    yield put(getProvidersSuccess(res.data))
  } catch (err) {
    if (err && err.response) {
      yield put(getProvidersFailure('An error occured during payment.'))
    } else {
      throw err
    }
  }
}

function* processPayment({ payload }: { type: string; payload: any }): any {
  try {
    const res = yield call(callApiPost, 'payments/', payload)
    if (res.status === 200) {
      yield put(paymentSuccess())
    }
  } catch (err) {
    if (err && err.response) {
      yield put(paymentFailure(err.response.data))
    } else {
      throw err
    }
  }
}

function* watchFetchCategories() {
  yield takeEvery(PaymentActionTypes.FETCH_CATEGORIES, fetchCategories)
}

function* watchProcessOrderRequest() {
  yield takeEvery(PaymentActionTypes.SUBMIT_ORDER_REQUEST, processOrderRequest)
}

function* watchPostFeeRequest() {
  yield takeEvery(PaymentActionTypes.REQUEST_FEE, processFeeRequest)
}

function* watchMobilePayment() {
  yield takeEvery(PaymentActionTypes.MOBILE_PAYMENT_REQUEST, mobilePayment)
}

function* watchMobileStatus() {
  yield takeEvery(PaymentActionTypes.MOBILE_STATUS_REQUEST, mobileStatus)
}

function* watchGetProviders() {
  yield takeEvery(PaymentActionTypes.GET_PROVIDERS_REQUEST, getProviders)
}

function* watchProcessPayment() {
  yield takeEvery(PaymentActionTypes.PAYMENT_REQUEST, processPayment)
}

function* paymentSaga(): Generator {
  yield all([
    fork(watchFetchCategories),
    fork(watchProcessOrderRequest),
    fork(watchPostFeeRequest),
    fork(watchMobilePayment),
    fork(watchMobileStatus),
    fork(watchGetProviders),
    fork(watchProcessPayment)
  ])
}

export { paymentSaga }
