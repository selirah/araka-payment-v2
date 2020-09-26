import { Reducer } from 'redux';
import { AuthState, AuthActionTypes } from './types';

export const initialState: AuthState = {
  isAuthenticated: false,
  isSubmitting: false,
  error: {},
  singleError: '',
  success: false,
  user: {},
};

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.REQUEST_LOGIN_SUBMIT:
      return {
        ...state,
        isSubmitting: true,
        error: {},
        singleError: '',
      };
    case AuthActionTypes.REQUEST_REGISTER_SUBMIT:
      return {
        ...state,
        isSubmitting: true,
        error: {},
        singleError: '',
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        user: action.payload,
        isAuthenticated: true,
        success: true,
      };
    case AuthActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
      };
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        user: action.payload,
        success: true,
      };
    case AuthActionTypes.LOG_SINGLE_ERROR: {
      return {
        ...state,
        isSubmitting: false,
        singleError: action.payload,
        success: false,
      };
    }
    case AuthActionTypes.REGISTER_ERROR:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
      };
    case AuthActionTypes.RESET_ERROR_STATE:
      return {
        ...state,
        error: {},
      };
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as authReducer };
