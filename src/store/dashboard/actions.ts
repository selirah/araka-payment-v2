import { action } from 'typesafe-actions';
import { DashboardTypes } from './types';
import { TransactionHistory, Currency } from '../../interfaces';

export const setTopBarHeader = (payload: string) =>
  action(DashboardTypes.TOPBAR_HEADER, payload);

export const setPageSwitch = (payload: string) =>
  action(DashboardTypes.PAGE_SWITCH, payload);

export const getTransactions = () => action(DashboardTypes.GET_TRANSACTIONS);

export const getTransactionsSuccess = (data: TransactionHistory[]) =>
  action(DashboardTypes.GET_TRANSACTIONS_SUCCESS, data);

export const getTransactionsFailure = (error: any) =>
  action(DashboardTypes.GET_TRANSACTIONS_FAILURE, error);

export const getCurrencies = () => action(DashboardTypes.GET_CURRENCIES);

export const getCurrenciesSuccess = (data: Currency[]) =>
  action(DashboardTypes.GET_CURRENCIES_SUCCESS, data);

export const getCurrenciesFailure = (error: any) =>
  action(DashboardTypes.GET_CURRENCIES_FAILURE, error);
