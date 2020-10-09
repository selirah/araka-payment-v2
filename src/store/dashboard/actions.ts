import { action } from 'typesafe-actions';
import { DashboardTypes } from './types';

export const setTopBarHeader = (payload: string) =>
  action(DashboardTypes.TOPBAR_HEADER, payload);

export const setPageSwitch = (payload: string) =>
  action(DashboardTypes.PAGE_SWITCH, payload);

export const getTransactions = () => action(DashboardTypes.GET_TRANSACTIONS);

export const getTransactionsSuccess = (data: any) =>
  action(DashboardTypes.GET_TRANSACTIONS_SUCCESS, data);

export const getTransactionsFailure = (error: any) =>
  action(DashboardTypes.GET_TRANSACTIONS_FAILURE, error);
