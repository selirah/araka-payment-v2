import { Reducer } from 'redux';
import { PaymentState, PaymentActionTypes } from './types';

export const initialState: PaymentState = {
  categories: [],
  products: [],
  error: undefined,
  loading: false,
  step: 1,
  activeCategory: 0,
  activeProduct: 0,
  orderResponse: undefined,
  isSubmit: false,
  orderData: undefined,
  orderError: undefined,
  product: undefined,
  category: undefined,
  isPerformingPayment: false,
  paymentOption: '',
};

const reducer: Reducer<PaymentState> = (state = initialState, action) => {
  switch (action.type) {
    case PaymentActionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case PaymentActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case PaymentActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
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

    case PaymentActionTypes.DECREASE_PAYMENT_STEP_CUSTOM:
      return {
        ...state,
        step: action.payload,
      };

    case PaymentActionTypes.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload,
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
        orderError: initialState.orderError,
      };

    case PaymentActionTypes.ORDER_SUCCESS:
      return {
        ...state,
        isSubmit: initialState.isSubmit,
        orderResponse: action.payload,
      };

    case PaymentActionTypes.ORDER_FAILURE:
      return {
        ...state,
        isSubmit: initialState.isSubmit,
        orderError: action.payload,
      };

    case PaymentActionTypes.SAVE_ORDER_DATA:
      return {
        ...state,
        orderData: action.payload,
      };

    case PaymentActionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case PaymentActionTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case PaymentActionTypes.IS_PERFORMING_PAYMENT:
      return {
        ...state,
        isPerformingPayment: action.payload,
      };

    case PaymentActionTypes.SET_ACTIVE_PAY_OPTION:
      return {
        ...state,
        paymentOption: action.payload,
      };

    case PaymentActionTypes.RESET_TRANSACTION:
      return {
        ...state,
        paymentOption: initialState.isPerformingPayment,
        product: initialState.product,
        category: initialState.category,
        activeCategory: initialState.activeCategory,
        activeProduct: initialState.activeProduct,
        orderData: initialState.orderData,
        step: initialState.step,
        orderError: initialState.orderError,
      };

    case PaymentActionTypes.CLEAR_ORDER_ERROR:
      return {
        ...state,
        orderError: initialState.orderError,
      };

    default:
      return state;
  }
};

export { reducer as paymentReducer };
