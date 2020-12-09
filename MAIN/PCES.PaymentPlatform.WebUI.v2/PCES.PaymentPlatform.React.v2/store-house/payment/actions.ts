import { Category } from 'interfaces/Category';
import * as action from 'interfaces/Action';
import { PaymentActionTypes } from './types';
import { Product } from 'interfaces/Product';
import { OrderResponse } from 'interfaces/OrderResponse';

export function fetchCategories(): action.FetchCategories {
  return {
    type: PaymentActionTypes.FETCH_CATEGORIES,
  };
}

export function fetchCategoriesSuccess(
  data: Category[]
): action.FetchCategoriesSuccess {
  return {
    type: PaymentActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: data,
  };
}

export function fetchCategoriesFailure(
  error: string
): action.FetchCategoriesFailure {
  return {
    type: PaymentActionTypes.FETCH_CATEGORIES_FAILURE,
    payload: error,
  };
}

export function increasePaymentStep(): action.IncreasePaymentStep {
  return {
    type: PaymentActionTypes.INCREASE_PAYMENT_STEP,
  };
}

export function decreasePaymentStep(): action.DecreasePaymentStep {
  return {
    type: PaymentActionTypes.DECREASE_PAYMENT_STEP,
  };
}

export function setActiveCategory(
  categoryId: number
): action.SetActiveCategory {
  return {
    type: PaymentActionTypes.SET_ACTIVE_CATEGORY,
    payload: categoryId,
  };
}

export function setScreen(screen: string): action.SetScreen {
  return {
    type: PaymentActionTypes.SET_SCREEN,
    payload: screen,
  };
}

export function setActiveProduct(productId: number): action.SetActiveProduct {
  return {
    type: PaymentActionTypes.SET_ACTIVE_PRODUCT,
    payload: productId,
  };
}

export function fetchProducts(products: Product[]): action.FetchProducts {
  return {
    type: PaymentActionTypes.FETCH_PRODUCTS,
    payload: products,
  };
}

export function processOrder(data: any): action.ProcessOrderRequest {
  console.log(data);
  return {
    type: PaymentActionTypes.SUBMIT_ORDER_REQUEST,
    payload: data,
  };
}

export function processOrderSuccess(
  data: OrderResponse
): action.ProcessOrderSuccess {
  return {
    type: PaymentActionTypes.ORDER_SUCCESS,
    payload: data,
  };
}

export function processOrderFailure(data: string): action.ProcessOrderFailure {
  return {
    type: PaymentActionTypes.ORDER_FAILURE,
    payload: data,
  };
}

export function saveOrderData(data: any): action.SaveOrderData {
  return {
    type: PaymentActionTypes.SAVE_ORDER_DATA,
    payload: data,
  };
}
