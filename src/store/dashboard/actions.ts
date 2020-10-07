import { action } from 'typesafe-actions';
import { DashboardTypes } from './types';

export const setTopBarHeader = (payload: string) =>
  action(DashboardTypes.TOPBAR_HEADER, payload);

export const setPageSwitch = (payload: string) =>
  action(DashboardTypes.PAGE_SWITCH, payload);
