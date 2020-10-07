import { Reducer } from 'redux';
import { DashboardState, DashboardTypes } from './types';
import { pageTypes } from '../../helpers/constants';

export const initialState: DashboardState = {
  topBarHeader: '',
  pageSwitch: pageTypes.HOME,
};

const reducer: Reducer<DashboardState> = (state = initialState, action) => {
  switch (action.type) {
    case DashboardTypes.TOPBAR_HEADER:
      return {
        ...state,
        topBarHeader: action.payload,
      };

    case DashboardTypes.PAGE_SWITCH:
      return {
        ...state,
        pageSwitch: action.payload,
      };

    default:
      return state;
  }
};

export { reducer as dashboardReducer };
