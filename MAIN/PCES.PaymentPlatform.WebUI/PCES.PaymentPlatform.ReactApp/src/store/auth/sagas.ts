import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { AuthActionTypes } from './types';
import {
  loginError,
  loginSuccess,
  registerError,
  registerSuccess,
  logError,
} from './actions';
import { callApiPost } from '../../utils/api';
import { ILogin } from '../../models/ILogin';
import { IRegister } from '../../models/IRegister';
import { authorization } from '../../utils/authorization';
import secure from 'secure-ls';

const ls = new secure({ encodingType: 'aes', isCompression: false });

function* login({ payload }: { type: string; payload: ILogin }) {
  try {
    const res = yield call(callApiPost, 'login', payload);
    ls.set('user', res.data);
    yield put(loginSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield authorization(err.response.data.token);
        yield put(loginError(err.response.data));
      } else {
        yield put(logError(err.response.data));
      }
    } else {
      throw err;
    }
  }
}

function* register({ payload }: { type: string; payload: IRegister }) {
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

function* watchLogin() {
  yield takeEvery(AuthActionTypes.REQUEST_LOGIN_SUBMIT, login);
}

function* watchRegister() {
  yield takeEvery(AuthActionTypes.REQUEST_REGISTER_SUBMIT, register);
}

function* authSaga() {
  yield all([fork(watchLogin), fork(watchRegister)]);
}

export default authSaga;
