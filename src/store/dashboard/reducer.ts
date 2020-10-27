import { Reducer } from 'redux';
import { DashboardState, DashboardTypes } from './types';
import { AuthActionTypes } from '../auth';
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
  editAccountFailure: false,
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
  isUpdatingBeneficiary: false,
  updateBeneficiarySuccess: false,
  updateBeneficiaryError: false,
  isDeletingBeneficiary: false,
  deletedBeneficiary: false,
  downloadReceiptStream: undefined,
  downloadRecieptError: false,
  downloadRecieptSuccess: false,
  isRequestingDownload: false,
  downloadError: undefined,
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
        editAccountSuccess: false,
        editAccountFailure: false,
      };
    case DashboardTypes.EDIT_ACCOUNT_SUCCESS:
      return {
        ...state,
        isEditing: false,
        client: action.payload,
        editAccountSuccess: true,
        redirect: true,
        editAccountFailure: false,
      };
    case DashboardTypes.EDIT_ACCOUNT_FAILURE:
      return {
        ...state,
        isEditing: false,
        editAccountError: action.payload,
        editAccountSuccess: false,
        editAccountFailure: true,
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
    case AuthActionTypes.DESTROY_STATES:
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

    case DashboardTypes.CLEAR_SOME_BOOLEANS:
      return {
        ...state,
        addBeneficiarySuccess: false,
        addBeneficiaryError: false,
        editAccountSuccess: false,
        updateBeneficiaryError: false,
        updateBeneficiarySuccess: false,
        deletedBeneficiary: false,
        downloadRecieptSuccess: initialState.downloadRecieptSuccess,
        downloadRecieptError: initialState.downloadRecieptError,
        downloadReceiptStream: initialState.downloadReceiptStream,
        downloadError: initialState.downloadError,
      };

    case DashboardTypes.UPDATE_BENEFICIARY_REQUEST:
      return {
        ...state,
        isUpdatingBeneficiary: true,
      };

    case DashboardTypes.UPDATE_BENEFICIARY_SUCCESS:
      let beneficiaries = state.beneficiaries.slice();
      beneficiaries = beneficiaries.filter(
        (beneficiary) =>
          beneficiary.beneficiaryId !== action.payload.beneficiaryId
      );
      beneficiaries.unshift(action.payload);
      return {
        ...state,
        isUpdatingBeneficiary: false,
        beneficiaries: beneficiaries,
        updateBeneficiarySuccess: true,
        updateBeneficiaryError: false,
      };

    case DashboardTypes.UPDATE_BENEFICIARY_FAILURE:
      return {
        ...state,
        isUpdatingBeneficiary: false,
        updateBeneficiarySuccess: false,
        updateBeneficiaryError: true,
        beneficiaryError: action.payload,
      };

    case DashboardTypes.DELETE_BENEFICIARY_REQUEST:
      return {
        ...state,
        isDeletingBeneficiary: true,
      };

    case DashboardTypes.DELETE_BENEFICIARY_SUCCESS:
      return {
        ...state,
        isDeletingBeneficiary: false,
        deletedBeneficiary: true,
        error: undefined,
        beneficiaries: state.beneficiaries.filter(
          (beneficiary) => beneficiary.beneficiaryId !== action.payload
        ),
      };

    case DashboardTypes.DELETE_BENEFICIARY_FAILURE:
      return {
        ...state,
        isDeletingBeneficiary: false,
        deletedBeneficiary: false,
        error: action.payload,
      };

    case DashboardTypes.DOWNLOAD_RECEIPT_REQUEST:
      return {
        ...state,
        isRequestingDownload: true,
      };

    case DashboardTypes.DOWNLOAD_RECEIPT_SUCCESS:
      return {
        ...state,
        isRequestingDownload: false,
        downloadReceiptStream: action.payload,
        downloadRecieptError: false,
        downloadRecieptSuccess: true,
        downloadError: undefined,
      };

    case DashboardTypes.DOWNLOAD_RECEIPT_FAILURE:
      return {
        ...state,
        isRequestingDownload: false,
        downloadReceiptStream: undefined,
        downloadRecieptError: true,
        downloadRecieptSuccess: false,
        downloadError: action.payload,
      };
    default:
      return state;
  }
};

export { reducer as dashboardReducer };
