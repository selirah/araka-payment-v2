import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from 'interfaces/AppState';
import { Action } from 'interfaces/Action';
import { PaymentActionTypes } from 'store-house/payment/types';
import { screen } from 'helper/contants';

export const initialState: AppState = {
  categories: [],
  products: [],
  error: undefined,
  loading: false,
  step: 1,
  activeCategory: 0,
  screen: screen.CATEGORY,
  activeProduct: 0,
  orderResponse: undefined,
  isSubmit: false,
  orderData: undefined,
};

const reducer = (
  state = initialState,
  action: Action | { type: typeof HYDRATE; payload: AppState }
): AppState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    case PaymentActionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        loading: true,
      };

    case PaymentActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case PaymentActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PaymentActionTypes.INCREASE_PAYMENT_STEP:
      return {
        ...state,
        step: state.step + 1,
      };

    case PaymentActionTypes.DECREASE_PAYMENT_STEP:
      return {
        ...state,
        step: state.step - 1,
      };

    case PaymentActionTypes.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload,
      };

    case PaymentActionTypes.SET_SCREEN:
      return {
        ...state,
        screen: action.payload,
      };

    case PaymentActionTypes.SET_ACTIVE_PRODUCT:
      return {
        ...state,
        activeProduct: action.payload,
      };

    case PaymentActionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case PaymentActionTypes.SUBMIT_ORDER_REQUEST:
      return {
        ...state,
        isSubmit: true,
      };

    case PaymentActionTypes.ORDER_SUCCESS:
      return {
        ...state,
        isSubmit: false,
        orderResponse: action.payload,
      };

    case PaymentActionTypes.ORDER_FAILURE:
      return {
        ...state,
        isSubmit: false,
        error: action.payload,
      };

    case PaymentActionTypes.SAVE_ORDER_DATA:
      return {
        ...state,
        isSubmit: false,
        orderData: action.payload,
      };

    default:
      return state;
  }
};

export { reducer as rootReducer };
