import { Reducer } from 'redux';
import { DashboardState, DashboardTypes } from './types';
import { pageTypes } from '../../helpers/constants';

export const initialState: DashboardState = {
  topBarHeader: pageTypes.HOME,
  pageSwitch: pageTypes.HOME,
  transactions: [],
  loading: false,
  error: undefined,
  currencies: [],
  currenciesLoading: false,
  currencyError: undefined
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
    case DashboardTypes.GET_TRANSACTIONS:
      return {
        ...state,
        loading: true,
      };
    case DashboardTypes.GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    case DashboardTypes.GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case DashboardTypes.GET_CURRENCIES:
      return {
        ...state,
        currenciesLoading: true,
      };
    case DashboardTypes.GET_CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: action.payload,
        currenciesLoading: false,
      };
    case DashboardTypes.GET_CURRENCIES_FAILURE:
      return {
        ...state,
        currenciesLoading: false,
        currencyError: action.payload,
      };
    default:
      return state;
  }
};

export { reducer as dashboardReducer };
