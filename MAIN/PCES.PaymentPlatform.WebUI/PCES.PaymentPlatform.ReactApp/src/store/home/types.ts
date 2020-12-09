import { ICategory } from '../../models/ICategory';
import { IProduct } from '../../models/IProduct';
import { IOrderResponse } from '../../models/IOrderResponse';

export enum HomeActionTypes {
  FETCH_CATEGORIES = '@@home/FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS = '@@home/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_ERROR = '@@home/FETCH_CATEGORIES_ERROR',
  FETCH_PRODUCTS = '@@home/FETCH_PRODUCTS',
  FETCH_PRODUCTS_SUCCESS = '@@home/FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_ERROR = '@@home/FETCH_PRODUCTS_ERROR',
  SET_CATEGORY_ACTIVE = '@@home/SET_CATEGORY_ACTIVE',
  SET_SUBMITTING = '@@home/SET_SUBMITTING',
  SHOW_MODAL = '@@home/SHOW_MODAL',
  MODAL_CONTENT = '@@home/MODAL_CONTENT',
  PREVIOUS_MODAL_HEADER = '@@home/PREVIOUS_MODAL_HEADER',
  MODAL_HEADER = '@@home/MODAL_HEADER',
  PROCESS_ORDER_REQUEST = '@@home/PROCESS_ORDER_REQUEST',
  PROCESS_ORDER_SUCCESS = '@@home/PROCESS_ORDER_SUCCESS',
  PROCESS_ORDER_ERROR = '@@home/PROCESS_ORDER_ERROR',
}

export interface HomeState {
  readonly categories: ICategory[];
  readonly products: IProduct[];
  readonly active: number;
  readonly isSubmitting: boolean;
  readonly showModal: boolean;
  readonly modalContent: string;
  readonly prevModalHeader: string;
  readonly modalHeader: string;
  readonly loading: boolean;
  readonly errors: any;
  readonly response: IOrderResponse | any;
}
