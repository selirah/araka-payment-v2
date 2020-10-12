import { TransactionHistory, Currency } from '../../interfaces';

export enum DashboardTypes {
  TOPBAR_HEADER = '@@dashboard/TOPBAR_HEADER',
  PAGE_SWITCH = '@@dashboard/PAGE_SWITCH',
  GET_TRANSACTIONS = '@@dashboard/GET_TRANSACTIONS',
  GET_TRANSACTIONS_SUCCESS = '@@dashboard/GET_TRANSACTIONS_SUCCESS',
  GET_TRANSACTIONS_FAILURE = '@@dashboard/GET_TRANSACTIONS_FAILURE',
  GET_CURRENCIES = '@@dashboard/GET_CURRENCIES',
  GET_CURRENCIES_SUCCESS = '@@dashboard/GET_CURRENCIES_SUCCESS',
  GET_CURRENCIES_FAILURE = '@@dashboard/GET_CURRENCIES_FAILURE',
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
};
