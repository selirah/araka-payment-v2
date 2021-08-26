import { action } from 'typesafe-actions'
import { PaymentActionTypes } from './types'
import {
  Category,
  Product,
  OrderResponse,
  Fee,
  TransactionHistory,
  Recipient
} from '../../interfaces'

export const fetchCategories = () => action(PaymentActionTypes.FETCH_CATEGORIES)

export const fetchCategoriesSuccess = (data: Category[]) =>
  action(PaymentActionTypes.FETCH_CATEGORIES_SUCCESS, data)

export const fetchCategoriesFailure = (error: any) =>
  action(PaymentActionTypes.FETCH_CATEGORIES_FAILURE, error)

export const increasePaymentStep = () =>
  action(PaymentActionTypes.INCREASE_PAYMENT_STEP)

export const decreasePaymentStep = () =>
  action(PaymentActionTypes.DECREASE_PAYMENT_STEP)

export const increasePaymentStepCustom = (step: number) =>
  action(PaymentActionTypes.INCREASE_PAYMENT_STEP_CUSTOM, step)

export const decreasePaymentStepCustom = (step: number) =>
  action(PaymentActionTypes.DECREASE_PAYMENT_STEP_CUSTOM, step)

export const setActiveCategory = (categoryId: number) =>
  action(PaymentActionTypes.SET_ACTIVE_CATEGORY, categoryId)

export const setActiveProduct = (productId: number) =>
  action(PaymentActionTypes.SET_ACTIVE_PRODUCT, productId)

export const processOrderRequest = (payload: any) =>
  action(PaymentActionTypes.SUBMIT_ORDER_REQUEST, payload)

export const processOrderSuccess = (data: OrderResponse) =>
  action(PaymentActionTypes.ORDER_SUCCESS, data)

export const processOrderFailure = (error: string) =>
  action(PaymentActionTypes.ORDER_FAILURE, error)

export const fetchProducts = (products: Product[]) =>
  action(PaymentActionTypes.FETCH_PRODUCTS, products)

export const saveOrderData = (data: any) =>
  action(PaymentActionTypes.SAVE_ORDER_DATA, data)

export const setCategory = (category: Category) =>
  action(PaymentActionTypes.SET_CATEGORY, category)

export const setProduct = (product: Product) =>
  action(PaymentActionTypes.SET_PRODUCT, product)

export const performingPayment = (payload: boolean) =>
  action(PaymentActionTypes.IS_PERFORMING_PAYMENT, payload)

export const setPayOption = (payload: string) =>
  action(PaymentActionTypes.SET_ACTIVE_PAY_OPTION, payload)

export const resetTransaction = () =>
  action(PaymentActionTypes.RESET_TRANSACTION)

export const clearOrderError = () =>
  action(PaymentActionTypes.CLEAR_ORDER_ERROR)

export const setFormValidError = (error: string) =>
  action(PaymentActionTypes.FORM_VALID_ERROR, error)

export const postFeeRequest = (payload: any) =>
  action(PaymentActionTypes.REQUEST_FEE, payload)

export const postFeeSuccess = (data: Fee) =>
  action(PaymentActionTypes.REQUEST_FEE_SUCCESS, data)

export const postFeeFailure = (error: any) =>
  action(PaymentActionTypes.REQUEST_FEE_FAILURE, error)

export const setRepeatTransaction = (payload: boolean) =>
  action(PaymentActionTypes.REPEAT_TRANSACTION, payload)

export const setTransaction = (transaction: TransactionHistory) =>
  action(PaymentActionTypes.SET_TRANSACTION, transaction)

export const setRecipientValues = (value: Recipient) =>
  action(PaymentActionTypes.SET_RECIPIENT_VALUES, value)

export const flushCategories = () => action(PaymentActionTypes.FLUSH_CATEGORIES)

export const repopulateForm = () => action(PaymentActionTypes.REPOPULATE_FORM)

export const mobilePaymentRequest = (payload: any) =>
  action(PaymentActionTypes.MOBILE_PAYMENT_REQUEST, payload)

export const mobilePaymentSuccess = (data: any) =>
  action(PaymentActionTypes.MOBILE_PAYMENT_SUCCESS, data)

export const mobilePaymentFailure = (error: string) =>
  action(PaymentActionTypes.MOBILE_PAYMENT_FAILURE, error)

export const checkMobileStatusRequest = (payload: any) =>
  action(PaymentActionTypes.MOBILE_STATUS_REQUEST, payload)

export const checkMobileStatusSuccess = (data: any) =>
  action(PaymentActionTypes.MOBILE_STATUS_SUCCESS, data)

export const checkMobileStatusFailure = (error: string) =>
  action(PaymentActionTypes.MOBILE_STATUS_FAILURE, error)

export const getProvidersRequest = () =>
  action(PaymentActionTypes.GET_PROVIDERS_REQUEST)

export const getProvidersSuccess = (data: any) =>
  action(PaymentActionTypes.GET_PROVIDERS_SUCCESS, data)

export const getProvidersFailure = (error: string) =>
  action(PaymentActionTypes.GET_PROVIDERS_FAILURE, error)

export const clearMobileStates = () =>
  action(PaymentActionTypes.CLEAR_MOBILE_STATES)

export const paymentRequest = (payload: any) =>
  action(PaymentActionTypes.PAYMENT_REQUEST, payload)

export const paymentSuccess = () => action(PaymentActionTypes.PAYMENT_SUCCESS)

export const paymentFailure = (error: string) =>
  action(PaymentActionTypes.PAYMENT_FAILURE, error)
