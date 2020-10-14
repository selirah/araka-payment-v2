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
  currencyError: undefined,
  editAccount: false,
  isEditing: false,
  editAccountError: undefined,
  editAccountSuccess: false,
  client: undefined,
  clientError: undefined,
  clientLoading: false,
  redirect: false,
  beneficiaries: [],
  addBeneficiaryError: false,
  addBeneficiarySuccess: false,
  beneficiaryError: undefined,
  isAddingBeneficiary: false,
  beneficiaryLoading: false,
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
        redirect: false,
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
    case DashboardTypes.EDIT_ACCOUNT:
      return {
        ...state,
        editAccount: action.payload,
        redirect: false,
      };
    case DashboardTypes.EDIT_ACCOUNT_REQUEST:
      return {
        ...state,
        isEditing: true,
      };
    case DashboardTypes.EDIT_ACCOUNT_SUCCESS:
      return {
        ...state,
        isEditing: false,
        client: action.payload,
        editAccountSuccess: true,
        redirect: true,
      };
    case DashboardTypes.EDIT_ACCOUNT_FAILURE:
      return {
        ...state,
        isEditing: false,
        editAccountError: action.payload,
        editAccountSuccess: false,
      };
    case DashboardTypes.GET_CURRENT_USER:
      return {
        ...state,
        clientLoading: true,
      };
    case DashboardTypes.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        clientLoading: false,
        client: action.payload,
      };
    case DashboardTypes.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        clientLoading: false,
        clientError: action.payload,
      };
    case DashboardTypes.DESTROY_STATES:
      return initialState;

    case DashboardTypes.ADD_BENEFICIARY_REQUEST:
      return {
        ...state,
        isAddingBeneficiary: true,
      };

    case DashboardTypes.ADD_BENEFICIARY_SUCCESS:
      return {
        ...state,
        isAddingBeneficiary: false,
        beneficiaries: [action.payload, ...state.beneficiaries],
        addBeneficiarySuccess: true,
        addBeneficiaryError: false,
      };

    case DashboardTypes.ADD_BENEFICIARY_FAILURE:
      return {
        ...state,
        isAddingBeneficiary: false,
        addBeneficiarySuccess: false,
        addBeneficiaryError: true,
        beneficiaryError: action.payload,
      };

    case DashboardTypes.GET_BENEFICIARIES:
      return {
        ...state,
        beneficiaryLoading: true,
      };

    case DashboardTypes.GET_BENEFICIARIES_SUCCESS:
      return {
        ...state,
        beneficiaryLoading: false,
        beneficiaries: action.payload,
      };

    case DashboardTypes.GET_BENEFICIARIES_FAILURE:
      return {
        ...state,
        beneficiaryLoading: false,
        beneficiaryError: action.payload,
      };
    default:
      return state;
  }
};

export { reducer as dashboardReducer };
