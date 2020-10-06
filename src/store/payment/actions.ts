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

export const decreasePaymentStep = () =>
  action(PaymentActionTypes.DECREASE_PAYMENT_STEP);

export const decreasePaymentStepCustom = (step: number) =>
  action(PaymentActionTypes.DECREASE_PAYMENT_STEP, step);

export const setActiveCategory = (categoryId: number) =>
  action(PaymentActionTypes.SET_ACTIVE_CATEGORY, categoryId);

export const setActiveProduct = (productId: number) =>
  action(PaymentActionTypes.SET_ACTIVE_PRODUCT, productId);

export const processOrderRequest = (payload: any) =>
  action(PaymentActionTypes.SUBMIT_ORDER_REQUEST, payload);

export const processOrderSuccess = (data: OrderResponse) =>
  action(PaymentActionTypes.ORDER_SUCCESS, data);

export const processOrderFailure = (error: string) =>
  action(PaymentActionTypes.ORDER_FAILURE, error);

export const fetchProducts = (products: Product[]) =>
  action(PaymentActionTypes.FETCH_PRODUCTS, products);

export const saveOrderData = (data: any) =>
  action(PaymentActionTypes.SAVE_ORDER_DATA, data);

export const setCategory = (category: Category) =>
  action(PaymentActionTypes.SET_CATEGORY, category);

export const setProduct = (product: Product) =>
  action(PaymentActionTypes.SET_PRODUCT, product);

export const performingPayment = (payload: boolean) =>
  action(PaymentActionTypes.IS_PERFORMING_PAYMENT, payload);

export const setPayOption = (payload: string) =>
  action(PaymentActionTypes.SET_ACTIVE_PAY_OPTION, payload);

export const resetTransaction = () =>
  action(PaymentActionTypes.RESET_TRANSACTION);

export const clearOrderError = () =>
  action(PaymentActionTypes.CLEAR_ORDER_ERROR);

export const setFormValidation = (valid: boolean) =>
  action(PaymentActionTypes.FORM_VALID, valid);
