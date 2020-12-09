import { action } from 'typesafe-actions';
import { ILogin } from '../../models/ILogin';
import { IError } from '../../models/IError';
import { IUser } from '../../models/IUser';
import { IRegister } from '../../models/IRegister';
import { AuthActionTypes } from './types';

export const loginRequest = (payload: ILogin) =>
  action(AuthActionTypes.REQUEST_LOGIN_SUBMIT, payload);

export const loginSuccess = (user: IUser) =>
  action(AuthActionTypes.LOGIN_SUCCESS, user);

export const loginError = (error: IError) =>
  action(AuthActionTypes.LOGIN_ERROR, error);

export const registerRequest = (payload: IRegister) =>
  action(AuthActionTypes.REQUEST_REGISTER_SUBMIT, payload);

export const registerSuccess = (user: IUser) =>
  action(AuthActionTypes.REGISTER_SUCCESS, user);

export const registerError = (error: IError) =>
  action(AuthActionTypes.REGISTER_ERROR, error);

export const resetErrorState = () => action(AuthActionTypes.RESET_ERROR_STATE);

export const logError = (error: string) =>
  action(AuthActionTypes.LOG_SINGLE_ERROR, error);

export const setUser = (user: IUser) => action(AuthActionTypes.SET_USER, user);

export const logout = () => action(AuthActionTypes.DESTROY_STATES);
