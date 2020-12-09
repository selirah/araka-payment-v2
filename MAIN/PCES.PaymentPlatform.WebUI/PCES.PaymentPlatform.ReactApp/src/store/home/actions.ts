import { action } from 'typesafe-actions';
import { HomeActionTypes } from './types';
import { ICategory } from '../../models/ICategory';
import { IProduct } from '../../models/IProduct';
import { IOrderResponse } from '../../models/IOrderResponse';

export const fetchCategories = () => action(HomeActionTypes.FETCH_CATEGORIES);

export const fetchCategoriesSuccess = (data: ICategory[]) =>
  action(HomeActionTypes.FETCH_CATEGORIES_SUCCESS, data);

export const fetchCategoriesError = (message: string) =>
  action(HomeActionTypes.FETCH_CATEGORIES_ERROR, message);

export const fetchProducts = (categoryId: number, merchantId: number) =>
  action(HomeActionTypes.FETCH_PRODUCTS, {
    categoryId: categoryId,
    merchantId: merchantId,
  });

export const fetchProductsSuccess = (data: IProduct[]) =>
  action(HomeActionTypes.FETCH_PRODUCTS_SUCCESS, data);

export const fetchProductsError = (message: string) =>
  action(HomeActionTypes.FETCH_PRODUCTS_ERROR, message);

export const showModal = (payload: boolean) =>
  action(HomeActionTypes.SHOW_MODAL, payload);

export const setModalHeader = (payload: string) =>
  action(HomeActionTypes.MODAL_HEADER, payload);

export const setPrevModalHeader = (payload: string) =>
  action(HomeActionTypes.PREVIOUS_MODAL_HEADER, payload);

export const setModalContent = (payload: string) =>
  action(HomeActionTypes.MODAL_CONTENT, payload);

export const setActiveCat = (payload: number) =>
  action(HomeActionTypes.SET_CATEGORY_ACTIVE, payload);

export const processOrder = (payload: any) =>
  action(HomeActionTypes.PROCESS_ORDER_REQUEST, payload);

export const processOrderSuccess = (payload: IOrderResponse) =>
  action(HomeActionTypes.PROCESS_ORDER_SUCCESS, payload);

export const processOrderError = (payload: any) =>
  action(HomeActionTypes.PROCESS_ORDER_ERROR, payload);
