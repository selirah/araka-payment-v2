import {
  Category,
  Product,
  OrderResponse,
  Fee,
  TransactionHistory,
  Recipient,
} from '../../interfaces';

export enum PaymentActionTypes {
  FETCH_CATEGORIES = '@@payment/FETCH_CATEGORIES',
  FETCH_PRODUCTS = '@@payment/FETCH_PRODUCTS',
  FETCH_CATEGORIES_SUCCESS = '@@payment/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE = '@@payment/FETCH_CATEGORIES_FAILURE',
  INCREASE_PAYMENT_STEP = '@@payment/INCREASE_PAYMENT_STEP',
  INCREASE_PAYMENT_STEP_CUSTOM = '@@payment/INCREASE_PAYMENT_STEP_CUSTOM',
  DECREASE_PAYMENT_STEP = '@@payment/DECREASE_PAYMENT_STEP',
  DECREASE_PAYMENT_STEP_CUSTOM = '@@payment/DECREASE_PAYMENT_STEP_CUSTOM',
  SET_ACTIVE_CATEGORY = '@@payment/SET_ACTIVE_CATEGORY',
  SET_ACTIVE_PRODUCT = '@@payment/SET_ACTIVE_PRODUCT',
  SUBMIT_ORDER_REQUEST = '@@payment/SUBMIT_ORDER_REQUEST',
  ORDER_SUCCESS = '@@payment/ORDER_SUCCESS',
  ORDER_FAILURE = '@@payment/ORDER_FAILURE',
  SAVE_ORDER_DATA = '@@payment/SAVE_ORDER_DATA',
  SET_PRODUCT = '@@payment/SET_PRODUCT',
  SET_CATEGORY = '@@payment/SET_CATEGORY',
  IS_PERFORMING_PAYMENT = '@@payment/IS_PERFORMING_PAYMENT',
  SET_ACTIVE_PAY_OPTION = '@@payment/SET_ACTIVE_PAY_OPTION',
  RESET_TRANSACTION = '@@payment/RESET_TRANSACTION',
  CLEAR_ORDER_ERROR = '@@payment/CLEAR_ORDER_ERROR',
  FORM_VALID_ERROR = '@@payment/FORM_VALID_ERROR',
  REQUEST_FEE = '@@payment/REQUEST_FEE',
  REQUEST_FEE_SUCCESS = '@@payment/REQUEST_FEE_SUCCESS',
  REQUEST_FEE_FAILURE = '@@payment/REQUEST_FEE_FAILURE',
  REPEAT_TRANSACTION = '@@payment/REPEAT_TRANSACTION',
  SET_TRANSACTION = '@@payment/SET_TRANSACTION',
  SET_RECIPIENT_VALUES = '@@payment/SET_RECIPIENT_VALUES',
  REPOPULATE_FORM = '@@payment/REPOPULATE_FORM',
  FLUSH_CATEGORIES = '@@payment/FLUSH_CATEGORIES',
  CLEAR_MOBILE_STATES = '@@payment/CLEAR_MOBILE_STATES',
  MOBILE_PAYMENT_REQUEST = '@@payment/MOBILE_PAYMENT_REQUEST',
  MOBILE_PAYMENT_SUCCESS = '@@payment/MOBILE_PAYMENT_SUCCESS',
  MOBILE_PAYMENT_FAILURE = '@@payment/MOBILE_PAYMENT_FAILURE',
  MOBILE_STATUS_REQUEST = '@@payment/MOBILE_STATUS_REQUEST',
  MOBILE_STATUS_SUCCESS = '@@payment/MOBILE_STATUS_SUCCESS',
  MOBILE_STATUS_FAILURE = '@@payment/MOBILE_STATUS_FAILURE',
  GET_PROVIDERS_REQUEST = '@@payment/GET_PROVIDERS_REQUEST',
  GET_PROVIDERS_SUCCESS = '@@payment/GET_PROVIDERS_SUCCESS',
  GET_PROVIDERS_FAILURE = '@@payment/GET_PROVIDERS_FAILURE',
}

export type PaymentState = {
  readonly categories: Category[];
  readonly products: Product[];
  readonly loading: boolean;
  readonly error: any;
  readonly step: number;
  readonly activeCategory: number;
  readonly activeProduct: number;
  readonly orderResponse: OrderResponse | undefined;
  readonly isSubmit: boolean;
  readonly orderData: any;
  readonly orderError: any;
  readonly product: Product | undefined;
  readonly category: Category | undefined;
  readonly isPerformingPayment: boolean;
  readonly paymentOption: string;
  readonly isFormValidError: string;
  readonly fee: Fee | undefined;
  readonly feeError: any;
  readonly feeLoading: boolean;
  readonly repeatTransaction: boolean;
  readonly transaction: TransactionHistory | undefined;
  readonly setRecipientValues: Recipient | undefined;
  readonly repopulateForm: boolean;
  readonly providers: any;
  readonly mobileResponse: any;
  readonly mobilePaymentSuccess: boolean;
  readonly mobilePaymentProcessing: boolean;
  readonly mobilePaymentSubmit: boolean;
  readonly trxStatus: any;
};
