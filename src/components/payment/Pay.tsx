import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { setPayOption } from '../../store/payment/actions';
import { payOption } from '../../helpers/constants';
import { path } from '../../helpers/path';
import {
  processOrderRequest,
  decreasePaymentStep,
  clearOrderError,
} from '../../store/payment/actions';
import { SmallIcon } from '../common/Styles';
import { secure } from '../../utils/secure';

const Pay: React.FC = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const {
    paymentOption,
    orderData,
    isSubmit,
    orderResponse,
    category,
    product,
  } = appSelector((state) => state.payment);
  const { isAuthenticated } = appSelector((state) => state.auth);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [option, setOption] = useState<string>('');
  const [buttonTitle, setButtonTitle] = useState<string>('Continue to Payment');

  const selectOption = (option: string): void => {
    dispatch(setPayOption(option));
  };

  useEffect(() => {
    setOption(paymentOption);
    setIsProcessing(isSubmit);
    if (orderResponse !== undefined) {
      setButtonTitle('Please wait ... ');
      secure.remove('orderData');
      history.push(path.redirecting);
    }
  }, [paymentOption, isSubmit, orderResponse, history]);

  const onSubmit = () => {
    switch (isAuthenticated) {
      case true:
        if (
          orderData !== undefined &&
          category !== undefined &&
          product !== undefined
        ) {
          orderData.data.productCategoryId = category.productCategoryId;
          orderData.data.productId = product.productId;
          dispatch(processOrderRequest(orderData));
        }
        break;
      case false:
        history.push(path.login);
    }
  };

  const previousProcess = (): void => {
    dispatch(decreasePaymentStep());
    dispatch(clearOrderError());
  };

  return (
    <React.Fragment>
      <div className="row display-options justify-content-center">
        <div className="col-sm-6 text-center option">
          <div
            className={`selectable-item ${
              option === payOption.CREDIT_CARD ? 'selected' : null
            }`}
          >
            <i
              className="mbri-mobile mb-3 text-custom"
              onClick={() => selectOption(payOption.CREDIT_CARD)}
            ></i>
            <h2 onClick={() => selectOption(payOption.CREDIT_CARD)}>
              Credit/Debit Card
            </h2>
          </div>
        </div>
        <div
          className="col-sm-6 text-center option"
          // onClick={() => selectOption(payOption.MPESA)}
        >
          <div
            className={`selectable-item ${
              option === payOption.MPESA ? 'selected' : null
            }`}
          >
            <i
              className="mbri-cash mb-3 text-custom"
              // onClick={() => selectOption(payOption.CREDIT_CARD)}
            ></i>
            <h2 /*onClick={() => selectOption(payOption.CREDIT_CARD)} */>
              mPesa
            </h2>
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
    </React.Fragment>
  );
};

export { Pay };
