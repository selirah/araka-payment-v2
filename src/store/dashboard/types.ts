export enum DashboardTypes {
  TOPBAR_HEADER = '@@dashboard/TOPBAR_HEADER',
  PAGE_SWITCH = '@@dashboard/PAGE_SWITCH',
}

export type DashboardState = {
  readonly topBarHeader: string;
  readonly pageSwitch: string;
};
