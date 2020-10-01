import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { AuthActionTypes } from './types';
import {
  loginError,
  loginSuccess,
  registerError,
  registerSuccess,
  logError,
  verificationSuccess,
  verificationError,
} from './actions';
import { callApiPost } from '../../utils/api';
import { Login, Register, Verification } from '../../interfaces';
import { authorization } from '../../utils/authorization';
import { secure } from '../../utils/secure';

function* login({ payload }: { type: string; payload: Login }) {
  try {
    const res = yield call(callApiPost, 'login', payload);
    secure.set('user', res.data);
    yield authorization(res.data.token);
    yield put(loginSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(loginError(err.response.data));
      } else {
        yield put(logError(err.response.data));
      }
    } else {
      throw err;
    }
  }
}

function* register({ payload }: { type: string; payload: Register }) {
  try {
    const res = yield call(callApiPost, 'login/register', payload);
    yield put(registerSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(registerError(err.response.data));
      } else {
        yield put(logError(err.response.data));
      }
    } else {
      throw err;
    }
  }
}

function* verify({ payload }: { type: string; payload: Verification }) {
  try {
    const res = yield call(callApiPost, 'login/verifyaccount', payload);
    yield put(verificationSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(verificationError(err.response.data));
      } else {
        yield put(logError(err.response.data));
      }
    } else {
      throw err;
    }
  }
}

function* watchLogin() {
  yield takeEvery(AuthActionTypes.REQUEST_LOGIN_SUBMIT, login);
}

function* watchRegister() {
  yield takeEvery(AuthActionTypes.REQUEST_REGISTER_SUBMIT, register);
}

function* watchVerification() {
  yield takeEvery(AuthActionTypes.VERIFY_EMAIL_REQUEST, verify);
}

function* authSaga() {
  yield all([fork(watchLogin), fork(watchRegister), fork(watchVerification)]);
}

export { authSaga };
