import { Reducer } from 'redux';
import { HomeState, HomeActionTypes } from './types';

export const initialState: HomeState = {
  categories: [],
  products: [],
  errors: undefined,
  loading: false,
  active: 0,
  isSubmitting: false,
  showModal: false,
  modalContent: '',
  prevModalHeader: '',
  modalHeader: '',
  response: undefined,
};

const reducer: Reducer<HomeState> = (state = initialState, action) => {
  switch (action.type) {
    case HomeActionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case HomeActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case HomeActionTypes.FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case HomeActionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case HomeActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case HomeActionTypes.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case HomeActionTypes.SET_CATEGORY_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    case HomeActionTypes.SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case HomeActionTypes.SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload,
      };
    case HomeActionTypes.MODAL_CONTENT:
      return {
        ...state,
        modalContent: action.payload,
      };
    case HomeActionTypes.PREVIOUS_MODAL_HEADER:
      return {
        ...state,
        prevModalHeader: action.payload,
      };
    case HomeActionTypes.MODAL_HEADER:
      return {
        ...state,
        modalHeader: action.payload,
      };
    case HomeActionTypes.PROCESS_ORDER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: {},
      };
    case HomeActionTypes.PROCESS_ORDER_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        response: action.payload,
      };
    case HomeActionTypes.PROCESS_ORDER_ERROR:
      return {
        ...state,
        isSubmitting: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export { reducer as homeReducer };
