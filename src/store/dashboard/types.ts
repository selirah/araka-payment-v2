export enum DashboardTypes {
  TOPBAR_HEADER = '@@dashboard/TOPBAR_HEADER',
  PAGE_SWITCH = '@@dashboard/PAGE_SWITCH',
  GET_TRANSACTIONS = '@@dashboard/GET_TRANSACTIONS',
  GET_TRANSACTIONS_SUCCESS = '@@dashboard/GET_TRANSACTIONS_SUCCESS',
  GET_TRANSACTIONS_FAILURE = '@@dashboard/GET_TRANSACTIONS_FAILURE',
}

export type DashboardState = {
  readonly topBarHeader: string;
  readonly pageSwitch: string;
  readonly transactions: any;
  readonly loading: boolean;
  readonly error: any;
};
