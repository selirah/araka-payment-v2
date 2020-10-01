import { action } from 'typesafe-actions';
import {
  Register,
  Login,
  Error,
  User,
  Verification,
  VerificationResponse,
} from '../../interfaces';
import { AuthActionTypes } from './types';

export const loginRequest = (payload: Login) =>
  action(AuthActionTypes.REQUEST_LOGIN_SUBMIT, payload);

export const loginSuccess = (user: User) =>
  action(AuthActionTypes.LOGIN_SUCCESS, user);

export const loginError = (error: Error) =>
  action(AuthActionTypes.LOGIN_ERROR, error);

export const registerRequest = (payload: Register) =>
  action(AuthActionTypes.REQUEST_REGISTER_SUBMIT, payload);

export const registerSuccess = (user: User) =>
  action(AuthActionTypes.REGISTER_SUCCESS, user);

export const registerError = (error: Error) =>
  action(AuthActionTypes.REGISTER_ERROR, error);

export const resetErrorState = () => action(AuthActionTypes.RESET_ERROR_STATE);

export const logError = (error: string) =>
  action(AuthActionTypes.LOG_SINGLE_ERROR, error);

export const setUser = (user: User) => action(AuthActionTypes.SET_USER, user);

export const logout = () => action(AuthActionTypes.DESTROY_STATES);

export const verificationRequest = (payload: Verification) =>
  action(AuthActionTypes.VERIFY_EMAIL_REQUEST, payload);

export const verificationSuccess = (response: VerificationResponse) =>
  action(AuthActionTypes.VERIFY_EMAIL_SUCCESS, response);

export const verificationError = (error: string) =>
  action(AuthActionTypes.VERIFY_EMAIL_FAILURE, error);
