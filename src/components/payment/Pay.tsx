import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { appSelector } from '../../helpers/appSelector'
import { AppDispatch } from '../../helpers/appDispatch'
import { setPayOption } from '../../store/payment/actions'
import { payOption } from '../../helpers/constants'
import { path } from '../../helpers/path'
import { creditDebitCards, mobileWallets } from '../../images/Images'
import {
  processOrderRequest,
  decreasePaymentStep,
  clearOrderError,
  getProvidersRequest,
  mobilePaymentRequest,
  checkMobileStatusRequest,
  clearMobileStates
} from '../../store/payment/actions'
import { SmallIcon } from '../common/Styles'
import { secure } from '../../utils/secure'

import { modalTypes } from '../../helpers/constants'
import { MobilePaymentModal } from '../common/MobilePaymentModal'
import { isEmpty } from '../../helpers/isEmpty'

const Pay: React.FC = () => {
  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()
  const {
    paymentOption,
    orderData,
    isSubmit,
    orderResponse,
    category,
    product,
    mobilePaymentSubmit,
    mobilePaymentSuccess,
    mobileResponse,
    error,
    providers,
    trxStatus
  } = appSelector((state) => state.payment)
  const { currencies } = appSelector((state) => state.dashboard)
  const { isAuthenticated } = appSelector((state) => state.auth)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [option, setOption] = useState<string>('')
  const [buttonTitle, setButtonTitle] = useState<string>('Continue to Payment')
  const [modalType, setModalType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [phone, setPhone] = useState('')
  const [provider, setProvider] = useState('')
  const [counter, setCounter] = useState(0)

  const selectOption = (option: string): void => {
    dispatch(setPayOption(option))
  }

  const onShowModalClick = (type: string): void => {
    setShowModal(true)
    setModalType(type)
  }

  const onCloseModal = (): void => {
    setShowModal(false)
    setModalType('')
  }

  useEffect(() => {
    dispatch(clearMobileStates())
    dispatch(getProvidersRequest())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setOption(paymentOption)
    setIsProcessing(isSubmit)
    if (orderResponse !== undefined) {
      setButtonTitle('Please wait ... ')
      secure.remove('orderData')
      history.push(path.redirecting)
    }

    if (mobilePaymentSuccess && !isEmpty(mobileResponse)) {
      if (counter <= 3) {
        setInterval(() => {
          dispatch(checkMobileStatusRequest(mobileResponse.transactionId))
          setCounter(counter + 1)
        }, 30000)
      } else {
        // history.push(path.dashboard);
        window.location.href = path.dashboard
      }
    }

    if (!isEmpty(trxStatus) && mobilePaymentSuccess) {
      switch (trxStatus.status) {
        case 'APPROVED':
          // history.push(path.success);
          window.location.href = path.success
          break
        case 'CANCELED':
          // history.push(path.cancelled);
          window.location.href = path.cancelled
          break
        case 'DECLINED':
          // history.push(path.failure);
          window.location.href = path.failure
          break
      }
    }
  }, [
    paymentOption,
    isSubmit,
    orderResponse,
    history,
    mobilePaymentSuccess,
    mobileResponse,
    dispatch,
    trxStatus,
    counter
  ])

  const onSubmit = () => {
    switch (isAuthenticated) {
      case true:
        if (option === payOption.CREDIT_CARD) {
          if (
            orderData !== undefined &&
            category !== undefined &&
            product !== undefined
          ) {
            const PaymentInfo = {
              Channel: '',
              Provider: '',
              WalletID: ''
            }
            orderData.data.productCategoryId = category.productCategoryId
            orderData.data.productId = product.productId
            orderData.PaymentInfo = PaymentInfo
            // console.log(orderData)
            dispatch(processOrderRequest(orderData))
          } 
        } else if (option === payOption.MPESA) {
          onShowModalClick(modalTypes.MOBILE_PAYMENT)
        }
        break
      case false:
        history.push(path.login)
    }
  }

  const previousProcess = (): void => {
    dispatch(decreasePaymentStep())
    dispatch(clearOrderError())
  }

  const onSubmitMobilePayment = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    if (
      orderData !== undefined &&
      category !== undefined &&
      product !== undefined
    ) {
      const PaymentInfo = {
        Channel: 'MOBILEWALLET',
        Provider: provider,
        WalletID: phone
      }
      orderData.data.productCategoryId = category.productCategoryId
      orderData.data.productId = product.productId
      orderData.PaymentInfo = PaymentInfo
      dispatch(mobilePaymentRequest(orderData))
    }
  }

  const onPhoneChange = (value: string) => {
    setPhone(value)
  }

  const onProviderChange = (e: React.FormEvent<EventTarget>) => {
    const { value } = e.target as HTMLTextAreaElement
    setProvider(value)
  }

  return (
    <React.Fragment>
      <div className="row display-options justify-content-center">
        <div className="col-sm-6 text-center option">
          <div
            className={`selectable-item ${
              option === payOption.CREDIT_CARD ? 'selected' : null
            }`}
            onClick={() => selectOption(payOption.CREDIT_CARD)}
          >
            <img src={creditDebitCards} alt="Pay with credit or debit card" />
            <h2>Credit/Debit Card</h2>
          </div>
        </div>
        <div className="col-sm-6 text-center option">
          <div
            className={`selectable-item ${
              option === payOption.MPESA ? 'selected' : null
            }`}
            onClick={() => selectOption(payOption.MPESA)}
          >
            <img src={mobileWallets} alt="Pay with mobile wallet" />
            <h2>Mobile Wallets</h2>
          </div>
        </div>
      </div>
      <div className="row justify-content-center option-submit">
        <button
          type="button"
          className="btn option-submit-button-previous"
          onClick={() => previousProcess()}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn option-submit-button"
          onClick={onSubmit}
          disabled={paymentOption === '' ? true : false}
        >
          {buttonTitle}{' '}
          {isProcessing ? (
            <React.Fragment>
              <SmallIcon className="fa fa-spinner fa-spin fa-3x fa-fw"></SmallIcon>
              <span className="sr-only">Loading...</span>
            </React.Fragment>
          ) : null}
        </button>
      </div>
      {showModal && modalType === modalTypes.MOBILE_PAYMENT ? (
        <MobilePaymentModal
          show={showModal}
          onClose={onCloseModal}
          setPhone={onPhoneChange}
          setProvider={onProviderChange}
          onSubmit={onSubmitMobilePayment}
          phone={phone}
          providers={providers}
          error={error}
          isSubmit={mobilePaymentSubmit}
          success={mobilePaymentSuccess}
          data={orderData}
          currencies={currencies}
        />
      ) : null}
    </React.Fragment>
  )
}

export { Pay }
