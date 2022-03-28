import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { AuthActionTypes } from './types'
import {
  loginError,
  loginSuccess,
  registerError,
  registerSuccess,
  logError,
  verificationSuccess,
  verificationError,
  logVerifyError,
  forgottenPasswordSuccess,
  forgottenPasswordFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  resendVerificationFailure,
  resendVerificationSuccess
} from './actions'
import { callApiPost } from '../../utils/api'
import {
  Login,
  Register,
  Verification,
  ForgottenPassword,
  ResetPassword
} from '../../interfaces'
import { authorization } from '../../utils/authorization'
import { secure } from '../../utils/secure'

function* login({ payload }: { type: string; payload: Login }): any {
  try {
    const res = yield call(callApiPost, 'login', payload)
    secure.set('user', res.data)
    yield authorization(res.data.token)
    yield put(loginSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(loginError(err.response.data))
      } else {
        yield put(logError(err.response.data))
      }
    } else {
      throw err
    }
  }
}

function* register({ payload }: { type: string; payload: Register }): any {
  try {
    const res = yield call(callApiPost, 'login/register', payload)
    yield put(registerSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(registerError(err.response.data))
      } else {
        yield put(logError(err.response.data))
      }
    } else {
      throw err
    }
  }
}

function* verify({ payload }: { type: string; payload: Verification }): any {
  try {
    const res = yield call(callApiPost, 'login/verifyaccount', payload)
    yield put(verificationSuccess(res.data))
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(verificationError(err.response.data))
      } else {
        yield put(logVerifyError(err.response.data))
      }
    }
  }
}

function* forgotten({
  payload
}: {
  type: string
  payload: ForgottenPassword
}): any {
  try {
    const res = yield call(callApiPost, 'login/requestpasswordreset', payload)
    if (res.status === 200) {
      yield put(forgottenPasswordSuccess(res.data))
    } else {
      yield put(forgottenPasswordFailure(res.data))
    }
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(forgottenPasswordFailure(err.response.data))
      } else {
        yield put(forgottenPasswordFailure(err.response.data))
      }
    }
  }
}

function* reset({ payload }: { type: string; payload: ResetPassword }): any {
  try {
    const res = yield call(callApiPost, 'login/resetpassword', payload)
    if (res.status === 200) {
      yield put(resetPasswordSuccess(res.data))
    } else {
      yield put(resetPasswordFailure(res.data))
    }
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(resetPasswordFailure(err.response.data))
      } else {
        yield put(resetPasswordFailure(err.response.data))
      }
    }
  }
}

function* resend({
  payload
}: {
  type: string
  payload: ForgottenPassword
}): any {
  try {
    const res = yield call(callApiPost, 'login/resendverification', payload)
    if (res.status === 200) {
      yield put(resendVerificationSuccess(res.data))
    } else {
      yield put(resendVerificationFailure(res.data))
    }
  } catch (err: any) {
    if (err && err.response) {
      if (err.response.data.status) {
        yield put(resendVerificationFailure(err.response.data))
      } else {
        yield put(resendVerificationFailure(err.response.data))
      }
    }
  }
}

function* watchLogin() {
  yield takeEvery(AuthActionTypes.REQUEST_LOGIN_SUBMIT, login)
}

function* watchRegister() {
  yield takeEvery(AuthActionTypes.REQUEST_REGISTER_SUBMIT, register)
}

function* watchVerification() {
  yield takeEvery(AuthActionTypes.VERIFY_EMAIL_REQUEST, verify)
}

function* watchForgottenPassword() {
  yield takeEvery(AuthActionTypes.FORGOTTEN_PASSWORD_REQUEST, forgotten)
}

function* watchResetPassword() {
  yield takeEvery(AuthActionTypes.RESET_PASSWORD_REQUEST, reset)
}

function* watchResendVerification() {
  yield takeEvery(AuthActionTypes.RESEND_VERIFICATION_REQUEST, resend)
}

function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchRegister),
    fork(watchVerification),
    fork(watchForgottenPassword),
    fork(watchResetPassword),
    fork(watchResendVerification)
  ])
}

export { authSaga }
