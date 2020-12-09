import { Category } from './Category';
import { PaymentActionTypes } from 'store-house/payment/types';
import { Product } from './Product';
import { OrderResponse } from './OrderResponse';

export interface FetchCategories {
  type: PaymentActionTypes.FETCH_CATEGORIES;
}

export interface FetchCategoriesSuccess {
  type: PaymentActionTypes.FETCH_CATEGORIES_SUCCESS;
  payload: Category[];
}

export interface FetchCategoriesFailure {
  type: PaymentActionTypes.FETCH_CATEGORIES_FAILURE;
  payload: string;
}

export interface IncreasePaymentStep {
  type: PaymentActionTypes.INCREASE_PAYMENT_STEP;
}

export interface DecreasePaymentStep {
  type: PaymentActionTypes.DECREASE_PAYMENT_STEP;
}

export interface SetActiveCategory {
  type: PaymentActionTypes.SET_ACTIVE_CATEGORY;
  payload: number;
}

export interface SetScreen {
  type: PaymentActionTypes.SET_SCREEN;
  payload: string;
}

export interface SetActiveProduct {
  type: PaymentActionTypes.SET_ACTIVE_PRODUCT;
  payload: number;
}

export interface FetchProducts {
  type: PaymentActionTypes.FETCH_PRODUCTS;
  payload: Product[];
}

export interface ProcessOrderRequest {
  type: PaymentActionTypes.SUBMIT_ORDER_REQUEST;
  payload: any;
}

export interface ProcessOrderSuccess {
  type: PaymentActionTypes.ORDER_SUCCESS;
  payload: OrderResponse;
}

export interface ProcessOrderFailure {
  type: PaymentActionTypes.ORDER_FAILURE;
  payload: string;
}

export interface SaveOrderData {
  type: PaymentActionTypes.SAVE_ORDER_DATA;
  payload: any;
}

export type Action =
  | FetchCategories
  | FetchCategoriesSuccess
  | FetchCategoriesFailure
  | IncreasePaymentStep
  | DecreasePaymentStep
  | SetActiveCategory
  | SetActiveProduct
  | SetScreen
  | FetchProducts
  | ProcessOrderRequest
  | ProcessOrderSuccess
  | ProcessOrderFailure
  | SaveOrderData;
