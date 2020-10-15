import {
  TransactionHistory,
  Currency,
  Client,
  Beneficiary,
} from '../../interfaces';

export enum DashboardTypes {
  TOPBAR_HEADER = '@@dashboard/TOPBAR_HEADER',
  PAGE_SWITCH = '@@dashboard/PAGE_SWITCH',
  GET_TRANSACTIONS = '@@dashboard/GET_TRANSACTIONS',
  GET_TRANSACTIONS_SUCCESS = '@@dashboard/GET_TRANSACTIONS_SUCCESS',
  GET_TRANSACTIONS_FAILURE = '@@dashboard/GET_TRANSACTIONS_FAILURE',
  GET_CURRENCIES = '@@dashboard/GET_CURRENCIES',
  GET_CURRENCIES_SUCCESS = '@@dashboard/GET_CURRENCIES_SUCCESS',
  GET_CURRENCIES_FAILURE = '@@dashboard/GET_CURRENCIES_FAILURE',
  EDIT_ACCOUNT = '@@dashboard/EDIT_ACCOUNT',
  EDIT_ACCOUNT_REQUEST = '@@dashboard/EDIT_ACCOUNT_REQUEST',
  EDIT_ACCOUNT_SUCCESS = '@@dashboard/EDIT_ACCOUNT_SUCCESS',
  EDIT_ACCOUNT_FAILURE = '@@dashboard/EDIT_ACCOUNT_FAILURE',
  DESTROY_STATES = '@@dashboard/DESTROY_STATES',
  GET_CURRENT_USER = '@@dashboard/GET_CURRENT_USER',
  GET_CURRENT_USER_SUCCESS = '@@dashboard/GET_CURRENT_USER_SUCCESS',
  GET_CURRENT_USER_FAILURE = '@@dashboard/GET_CURRENT_USER_FAILURE',
  ADD_BENEFICIARY_REQUEST = '@@dashboard/ADD_BENEFICIARY_REQUEST',
  ADD_BENEFICIARY_SUCCESS = '@@dashboard/ADD_BENEFICIARY_SUCCESS',
  ADD_BENEFICIARY_FAILURE = '@@dashboard/ADD_BENEFICIARY_FAILURE',
  GET_BENEFICIARIES = '@@dashboard/GET_BENEFICIARIES',
  GET_BENEFICIARIES_SUCCESS = '@@dashboard/GET_BENEFICIARIES_SUCCESS',
  GET_BENEFICIARIES_FAILURE = '@@dashboard/GET_BENEFICIARIES_FAILURE',
  CLEAR_SOME_BOOLEANS = '@@dashboard/CLEAR_SOME_BOOLEANS',
}

export type DashboardState = {
  readonly topBarHeader: string;
  readonly pageSwitch: string;
  readonly transactions: TransactionHistory[];
  readonly loading: boolean;
  readonly error: any;
  readonly currencies: Currency[];
  readonly currenciesLoading: boolean;
  readonly currencyError: any;
  readonly editAccount: boolean;
  readonly isEditing: boolean;
  readonly editAccountError: any;
  readonly editAccountSuccess: boolean;
  readonly redirect: boolean;
  readonly client: Client | undefined;
  readonly clientError: any;
  readonly clientLoading: boolean;
  readonly beneficiaries: Beneficiary[];
  readonly beneficiaryLoading: boolean;
  readonly beneficiaryError: any;
  readonly isAddingBeneficiary: boolean;
  readonly addBeneficiarySuccess: boolean;
  readonly addBeneficiaryError: boolean;
};
