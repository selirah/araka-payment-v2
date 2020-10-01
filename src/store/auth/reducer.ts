import { Reducer } from 'redux';
import { AuthState, AuthActionTypes } from './types';

export const initialState: AuthState = {
  isAuthenticated: false,
  isSubmitting: false,
  error: {},
  singleError: '',
  success: false,
  user: {},
  verificationResponse: undefined,
  verifyError: '',
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
    case AuthActionTypes.VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        singleError: '',
      };
    case AuthActionTypes.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        verificationResponse: action.payload,
        success: true,
      };
    case AuthActionTypes.VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        verifyError: action.payload,
      };
    case AuthActionTypes.VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        verificationResponse: initialState.verificationResponse,
      };
    case AuthActionTypes.VERIFY_ERROR: {
      return {
        ...state,
        isSubmitting: false,
        verifyError: action.payload,
        success: false,
      };
    }
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as authReducer };
