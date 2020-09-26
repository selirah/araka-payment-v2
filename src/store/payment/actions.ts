import { action } from 'typesafe-actions';
import { PaymentActionTypes } from './types';
import { Category, Product, OrderResponse } from '../../interfaces';

export const fetchCategories = () =>
  action(PaymentActionTypes.FETCH_CATEGORIES);

export const fetchCategoriesSuccess = (data: Category[]) =>
  action(PaymentActionTypes.FETCH_CATEGORIES_SUCCESS, data);

export const fetchCategoriesFailure = (message: string) =>
  action(PaymentActionTypes.FETCH_CATEGORIES_FAILURE, message);

export const increasePaymentStep = () =>
  action(PaymentActionTypes.INCREASE_PAYMENT_STEP);

export const decreasePaymentStep = (step: number) =>
  action(PaymentActionTypes.DECREASE_PAYMENT_STEP, step);

export const setActiveCategory = (categoryId: number) =>
  action(PaymentActionTypes.SET_ACTIVE_CATEGORY, categoryId);

export const setActiveProduct = (productId: number) =>
  action(PaymentActionTypes.SET_ACTIVE_PRODUCT, productId);

export const processOrderRequest = (payload: any) =>
  action(PaymentActionTypes.SUBMIT_ORDER_REQUEST, payload);

export const processOrderSuccess = (data: OrderResponse) =>
  action(PaymentActionTypes.ORDER_SUCCESS, data);

export const processOrderFailure = (error: any) =>
  action(PaymentActionTypes.ORDER_FAILURE, error);

export const fetchProducts = (products: Product[]) =>
  action(PaymentActionTypes.FETCH_PRODUCTS, products);

export const saveOrderData = (data: any) =>
  action(PaymentActionTypes.SAVE_ORDER_DATA, data);
