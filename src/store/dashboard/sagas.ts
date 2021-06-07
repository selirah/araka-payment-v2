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
  addBeneficiarySuccess,
  addBeneficiaryFailure,
  getBeneficiariesSuccess,
  getBeneficiariesFailure,
  updateBeneficiarySuccess,
  updateBeneficiaryFailure,
  deleteBeneficiarySuccess,
  deleteBeneficiaryFailure,
  downloadReceiptSuccess,
  downloadReceiptFailure,
  changePasswordSuccess,
  changePasswordFailure,
} from './actions';
import { callApiGet, callApiPost } from '../../utils/api';
import {
  Client,
  Beneficiary,
  DataStream,
  ChangePassword,
} from '../../interfaces';

function* getTransactions(): any {
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

function* getCurrencies(): any {
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

function* getUser({ payload }: { type: string; payload: number }): any {
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

function* updateUser({ payload }: { type: string; payload: Client }): any {
  try {
    const res = yield call(callApiPost, 'payments/clientdetails', payload);
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

function* addBeneficiary({
  payload,
}: {
  type: string;
  payload: Beneficiary;
}): any {
  try {
    const res = yield call(callApiPost, 'payments/addbeneficiary', payload);
    if (res.status === 200) {
      yield put(addBeneficiarySuccess(res.data));
    } else {
      yield put(addBeneficiaryFailure(res.data));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(addBeneficiaryFailure(err.response.data));
    } else {
      yield put(addBeneficiaryFailure('An unknwon error occurred'));
    }
  }
}

function* getBeneficiaries({
  payload,
}: {
  type: string;
  payload: number;
}): any {
  try {
    const res = yield call(callApiGet, `payments/beneficiaries/${payload}`);
    if (res.status === 200) {
      yield put(getBeneficiariesSuccess(res.data));
    } else {
      yield put(getBeneficiariesFailure('An unknwon error occurred'));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(getBeneficiariesFailure(err.response.data));
    } else {
      yield put(getBeneficiariesFailure('An unknwon error occurred'));
    }
  }
}

function* updateBeneficiary({
  payload,
}: {
  type: string;
  payload: Beneficiary;
}): any {
  try {
    const res = yield call(callApiPost, 'payments/updatebeneficiary', payload);
    if (res.status === 200) {
      yield put(updateBeneficiarySuccess(res.data));
    } else {
      yield put(updateBeneficiaryFailure(res.data));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(updateBeneficiaryFailure(err.response.data));
    } else {
      yield put(updateBeneficiaryFailure('An unknwon error occurred'));
    }
  }
}

function* deleteBeneficiary({
  payload,
}: {
  type: string;
  payload: number;
}): any {
  try {
    const res = yield call(callApiPost, `payments/deletebeneficiary`, {
      beneficiaryId: payload,
    });
    if (res.status === 200) {
      yield put(deleteBeneficiarySuccess(payload));
    } else {
      yield put(deleteBeneficiaryFailure(res.data));
    }
  } catch (err) {
    if (err && err.response) {
      yield put(deleteBeneficiaryFailure(err.response.data));
    } else {
      yield put(deleteBeneficiaryFailure('An unknwon error occurred'));
    }
  }
}

function* getDownloadReceiptStream({
  payload,
}: {
  type: string;
  payload: number;
}): any {
  try {
    const res = yield call(
      callApiGet,
      `payments/gettransactionreciept/${payload}`
    );
    if (res.status === 200) {
      yield put(downloadReceiptSuccess(res.data));

      let file: DataStream = res.data;
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${file.fileContents}`;
      link.download = file.fileDownloadName;
      link.click();
    }
  } catch (err) {
    if (err && err.response) {
      yield put(downloadReceiptFailure(err.response.data));
    } else {
      yield put(downloadReceiptFailure('An unknwon error occurred'));
    }
  }
}

function* changePassword({
  payload,
}: {
  type: string;
  payload: ChangePassword;
}): any {
  try {
    const res = yield call(callApiPost, 'login/changepassword', payload);
    if (res.status === 200) {
      yield put(changePasswordSuccess());
    } else {
      yield put(changePasswordSuccess());
    }
  } catch (err) {
    if (err && err.response) {
      yield put(changePasswordFailure(err.response.data));
    } else {
      yield put(changePasswordFailure('An unknwon error occurred'));
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

function* watchAddBeneficiary() {
  yield takeEvery(DashboardTypes.ADD_BENEFICIARY_REQUEST, addBeneficiary);
}

function* watchGetBeneficiaries() {
  yield takeEvery(DashboardTypes.GET_BENEFICIARIES, getBeneficiaries);
}

function* watchUpdateBeneficiary() {
  yield takeEvery(DashboardTypes.UPDATE_BENEFICIARY_REQUEST, updateBeneficiary);
}

function* watchDeleteBeneficiary() {
  yield takeEvery(DashboardTypes.DELETE_BENEFICIARY_REQUEST, deleteBeneficiary);
}

function* watchFetchGetDownloadReceiptStream() {
  yield takeEvery(
    DashboardTypes.DOWNLOAD_RECEIPT_REQUEST,
    getDownloadReceiptStream
  );
}

function* watchChangePassword() {
  yield takeEvery(DashboardTypes.CHANGE_PASSWORD_REQUEST, changePassword);
}

function* dashboardSaga(): Generator {
  yield all([
    fork(watchGetTransactions),
    fork(watchGetCurrencies),
    fork(watchGetUser),
    fork(watchUpdateUser),
    fork(watchAddBeneficiary),
    fork(watchGetBeneficiaries),
    fork(watchUpdateBeneficiary),
    fork(watchDeleteBeneficiary),
    fork(watchFetchGetDownloadReceiptStream),
    fork(watchChangePassword),
  ]);
}

export { dashboardSaga };
