import { Reducer } from 'redux'
import { PaymentState, PaymentActionTypes } from './types'
import { AuthActionTypes } from '../auth'

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
  isFormValidError: '',
  fee: undefined,
  feeError: undefined,
  feeLoading: false,
  repeatTransaction: false,
  transaction: undefined,
  setRecipientValues: undefined,
  repopulateForm: false,
  mobileResponse: null,
  providers: [],
  mobilePaymentSuccess: false,
  mobilePaymentProcessing: false,
  mobilePaymentSubmit: false,
  trxStatus: null,
  submitted: false
}

const reducer: Reducer<PaymentState> = (state = initialState, action) => {
  switch (action.type) {
    case PaymentActionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        loading: true
      }
    case PaymentActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false
      }
    case PaymentActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case PaymentActionTypes.INCREASE_PAYMENT_STEP:
      return {
        ...state,
        step: state.step + 1
      }

    case PaymentActionTypes.INCREASE_PAYMENT_STEP_CUSTOM:
      return {
        ...state,
        step: action.payload
      }

    case PaymentActionTypes.DECREASE_PAYMENT_STEP:
      return {
        ...state,
        step: state.step - 1
      }

    case PaymentActionTypes.DECREASE_PAYMENT_STEP_CUSTOM:
      return {
        ...state,
        step: action.payload
      }

    case PaymentActionTypes.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload
      }

    case PaymentActionTypes.SET_ACTIVE_PRODUCT:
      return {
        ...state,
        activeProduct: action.payload
      }

    case PaymentActionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }

    case PaymentActionTypes.SUBMIT_ORDER_REQUEST:
      return {
        ...state,
        isSubmit: true,
        orderError: initialState.orderError
      }

    case PaymentActionTypes.ORDER_SUCCESS:
      return {
        ...state,
        isSubmit: initialState.isSubmit,
        orderResponse: action.payload
      }

    case PaymentActionTypes.ORDER_FAILURE:
      return {
        ...state,
        isSubmit: initialState.isSubmit,
        orderError: action.payload
      }

    case PaymentActionTypes.SAVE_ORDER_DATA:
      return {
        ...state,
        orderData: action.payload
      }

    case PaymentActionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      }

    case PaymentActionTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload
      }

    case PaymentActionTypes.IS_PERFORMING_PAYMENT:
      return {
        ...state,
        isPerformingPayment: action.payload
      }

    case PaymentActionTypes.SET_ACTIVE_PAY_OPTION:
      return {
        ...state,
        paymentOption: action.payload
      }

    case PaymentActionTypes.RESET_TRANSACTION:
      return {
        ...state,
        paymentOption: initialState.paymentOption,
        product: initialState.product,
        category: initialState.category,
        activeCategory: initialState.activeCategory,
        activeProduct: initialState.activeProduct,
        orderData: initialState.orderData,
        orderResponse: initialState.orderResponse,
        step: initialState.step,
        orderError: initialState.orderError,
        isFormValidError: initialState.isFormValidError,
        fee: initialState.fee,
        feeError: initialState.feeError,
        setRecipientValues: initialState.setRecipientValues,
        repopulateForm: initialState.repopulateForm,
        isSubmit: initialState.isSubmit
      }

    case PaymentActionTypes.CLEAR_ORDER_ERROR:
      return {
        ...state,
        orderError: initialState.orderError
      }

    case PaymentActionTypes.FORM_VALID_ERROR:
      return {
        ...state,
        isFormValidError: action.payload
      }

    case PaymentActionTypes.REQUEST_FEE:
      return {
        ...state,
        feeError: initialState.feeError,
        feeLoading: true
      }

    case PaymentActionTypes.REQUEST_FEE_SUCCESS:
      return {
        ...state,
        fee: action.payload,
        feeLoading: false
      }

    case PaymentActionTypes.REQUEST_FEE_FAILURE:
      return {
        ...state,
        feeError: action.payload,
        feeLoading: false
      }

    case PaymentActionTypes.REPEAT_TRANSACTION:
      return {
        ...state,
        repeatTransaction: action.payload
      }

    case PaymentActionTypes.SET_TRANSACTION:
      return {
        ...state,
        transaction: action.payload
      }

    case PaymentActionTypes.SET_RECIPIENT_VALUES:
      return {
        ...state,
        setRecipientValues: action.payload
      }

    case PaymentActionTypes.REPOPULATE_FORM:
      return {
        ...state,
        repopulateForm: true
      }

    case PaymentActionTypes.FLUSH_CATEGORIES:
      return {
        ...state,
        categories: []
      }

    case PaymentActionTypes.MOBILE_PAYMENT_REQUEST:
      return {
        ...state,
        mobilePaymentSubmit: true,
        error: undefined
      }

    case PaymentActionTypes.MOBILE_PAYMENT_SUCCESS:
      return {
        ...state,
        mobilePaymentSubmit: false,
        mobileResponse: action.payload,
        mobilePaymentSuccess: true
      }

    case PaymentActionTypes.MOBILE_PAYMENT_FAILURE:
      return {
        ...state,
        mobilePaymentSubmit: false,
        error: action.payload,
        mobilePaymentSuccess: false
      }

    case PaymentActionTypes.MOBILE_STATUS_REQUEST:
      return {
        ...state,
        mobilePaymentProcessing: true,
        error: undefined
      }

    case PaymentActionTypes.MOBILE_STATUS_SUCCESS:
      return {
        ...state,
        mobilePaymentProcessing: false,
        trxStatus: action.payload
      }

    case PaymentActionTypes.MOBILE_STATUS_FAILURE:
      return {
        ...state,
        mobilePaymentProcessing: false,
        error: action.payload
      }

    case PaymentActionTypes.GET_PROVIDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: undefined
      }

    case PaymentActionTypes.GET_PROVIDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        providers: action.payload
      }

    case PaymentActionTypes.GET_PROVIDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case PaymentActionTypes.CLEAR_MOBILE_STATES:
      return {
        ...state,
        mobilePaymentSuccess: false,
        error: undefined,
        mobilePaymentProcessing: false,
        mobilePaymentSubmit: false,
        mobileResponse: null,
        trxStatus: null
      }

    case PaymentActionTypes.PAYMENT_REQUEST:
      return {
        ...state,
        isSubmit: true,
        orderError: initialState.orderError
      }

    case PaymentActionTypes.PAYMENT_SUCCESS:
      return {
        ...state,
        isSubmit: initialState.isSubmit,
        submitted: true
      }

    case PaymentActionTypes.PAYMENT_FAILURE:
      return {
        ...state,
        isSubmit: initialState.isSubmit,
        orderError: action.payload,
        submitted: initialState.submitted
      }

    case AuthActionTypes.DESTROY_STATES:
      return initialState

    default:
      return state
  }
}

export { reducer as paymentReducer }
