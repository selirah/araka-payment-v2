import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { setPayOption } from '../../store/payment/actions';
import { payOption } from '../../helpers/constants';
import { path } from '../../helpers/path';
import { User } from 'src/interfaces';

const Pay: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { paymentOption } = appSelector((state) => state.payment);
  const { isAuthenticated, user } = appSelector((state) => state.auth);
  const [userData, setUserData] = useState<User>({});
  const history = useHistory();

  const [option, setOption] = useState<string>('');
  const data = localStorage.getItem('orderData');
  const [submitData, setSubmitData] = useState<any>(null);

  const selectOption = (option: string): void => {
    dispatch(setPayOption(option));
  };

  useEffect(() => {
    setOption(paymentOption);
    if (user !== {}) {
      setUserData(user);
    }
  }, [paymentOption, user]);

  const onSubmit = () => {
    // dispatch(processOrder(orderData));
    switch (isAuthenticated) {
      case true:
        if (data !== null) {
          setSubmitData(JSON.parse(data));
          if (submitData !== null) {
            submitData.data.Amount = parseInt(submitData.data.Amount);
          }
        }
        (async () => {
          console.log(localStorage.getItem('orderData'));
          const rawResponse = await fetch(
            'https://pcessppappserverdev01.eastus.cloudapp.azure.com/api/payments/processrequest',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userData.token}`,
                'Content-Type': 'application/json',
              },
              body: localStorage.getItem('orderData'),
            }
          );
          const content = await rawResponse.json();
          // console.log(content);
          window.location.href = content.order.orderURL;
        })();
        break;
      case false:
        history.push(path.login);
    }
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
          onClick={() => selectOption(payOption.MPESA)}
        >
          <div
            className={`selectable-item ${
              option === payOption.MPESA ? 'selected' : null
            }`}
          >
            <i
              className="mbri-cash mb-3 text-custom"
              onClick={() => selectOption(payOption.CREDIT_CARD)}
            ></i>
            <h2 onClick={() => selectOption(payOption.CREDIT_CARD)}>mPesa</h2>
          </div>
        </div>
      </div>
      <div className="row justify-content-center option-submit">
        <button
          type="button"
          className="btn option-submit-button"
          onClick={onSubmit}
          disabled={paymentOption === '' ? true : false}
        >
          Continue to Payment{' '}
          {/* {isProcessing ? (
            <React.Fragment>
              <SmallIcon className="fa fa-spinner fa-spin fa-3x fa-fw"></SmallIcon>
              <span className="sr-only">Loading...</span>
            </React.Fragment>
          ) : null} */}
        </button>
      </div>
    </React.Fragment>
  );
};

export { Pay };
