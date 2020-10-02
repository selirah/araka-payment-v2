import { User, Error, VerificationResponse } from '../../interfaces';

export enum AuthActionTypes {
  IS_SUBMITTING = '@@auth/IS_SUBMITTING',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  LOGIN_ERROR = '@@auth/LOGIN_ERROR',
  REQUEST_LOGIN_SUBMIT = '@@auth/REQUEST_LOGIN_SUBMIT',
  REQUEST_REGISTER_SUBMIT = '@@auth/REQUEST_REGISTER_SUBMIT',
  REGISTER_SUCCESS = '@@auth/REGISTER_SUCCESS',
  REGISTER_ERROR = '@@auth/REGISTER_ERROR',
  RESET_ERROR_STATE = '@@auth/RESET_ERROR_STATE',
  LOG_SINGLE_ERROR = '@@auth/LOG_SINGLE_ERROR',
  SET_USER = '@@auth/SET_USER',
  DESTROY_STATES = '@@auth/DESTROY_STATES',
  VERIFY_EMAIL_REQUEST = '@@auth/VERIFY_EMAIL_REQUEST',
  VERIFY_EMAIL_SUCCESS = '@@auth/VERIFY_EMAIL_SUCCESS',
  VERIFY_EMAIL_FAILURE = '@@auth/VERIFY_EMAIL_FAILURE',
  CLEAR_VERIFICATION_RESPONSE = '@@auth/CLEAR_VERIFICATION_RESPONSE',
  VERIFY_ERROR = '@@auth/VERIFY_ERROR',
}

export type AuthState = {
  readonly isAuthenticated: boolean;
  readonly isSubmitting: boolean;
  readonly error: Error | {};
  readonly success: boolean;
  readonly user: User | {};
  readonly singleError: string;
  readonly verificationResponse: VerificationResponse | undefined;
  readonly verifyError: string;
  readonly isVerifying: boolean;
  readonly isVerified: boolean;
};
