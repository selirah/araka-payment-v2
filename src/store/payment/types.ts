import { Category, Product, OrderResponse } from '../../interfaces';

export enum PaymentActionTypes {
  FETCH_CATEGORIES = '@@payment/FETCH_CATEGORIES',
  FETCH_PRODUCTS = '@@payment/FETCH_PRODUCTS',
  FETCH_CATEGORIES_SUCCESS = '@@payment/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE = '@@payment/FETCH_CATEGORIES_FAILURE',
  INCREASE_PAYMENT_STEP = '@@payment/INCREASE_PAYMENT_STEP',
  DECREASE_PAYMENT_STEP = '@@payment/DECREASE_PAYMENT_STEP',
  SET_ACTIVE_CATEGORY = '@@payment/SET_ACTIVE_CATEGORY',
  SET_ACTIVE_PRODUCT = '@@payment/SET_ACTIVE_PRODUCT',
  SUBMIT_ORDER_REQUEST = '@@payment/SUBMIT_ORDER_REQUEST',
  ORDER_SUCCESS = '@@payment/ORDER_SUCCESS',
  ORDER_FAILURE = '@@payment/ORDER_FAILURE',
  SAVE_ORDER_DATA = '@@payment/SAVE_ORDER_DATA',
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
};
