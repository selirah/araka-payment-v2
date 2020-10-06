import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Button } from './Button';
import {
  increasePaymentStep,
  performingPayment,
  saveOrderData,
  decreasePaymentStep,
} from '../../store/payment/actions';
import { secure } from '../../utils/secure';
import { isEmpty } from '../../helpers/isEmpty';
import { EmptyBox } from './EmptyBox';
import { filter } from '../../helpers/filter';
import moment from 'moment';

const Summary: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { category, product } = appSelector((state) => state.payment);
  const data: any = secure.get('orderData');

  useEffect(() => {
    const data: any = secure.get('orderData');
    if (!isEmpty(data) && data !== undefined) {
      dispatch(saveOrderData(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const continueProcess = (): void => {
    dispatch(increasePaymentStep());
    dispatch(performingPayment(true));
  };

  const previousProcess = (): void => {
    dispatch(decreasePaymentStep());
  };

  let keys;
  let values;
  if (data !== null || data !== undefined) {
    keys = Object.keys(data.data).map(function (key, index) {
      const { value } = filter(product!, key);

      return (
        <React.Fragment key={index}>
          {!value ? (
            <label htmlFor="">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</label>
          ) : null}
        </React.Fragment>
      );
    });

    values = Object.keys(data.data).map(function (key, index) {
      const { value, selectLabel, isDate } = filter(product!, key);
      let v;
      if (isDate) {
        v = moment(data.data[key]).format('MMMM D, YYYY (h:mm a)');
      } else {
        v = data.data[key];
      }

      return (
        <React.Fragment key={index}>
          {!value ? (
            <label htmlFor="">{selectLabel !== '' ? selectLabel : v}</label>
          ) : null}
        </React.Fragment>
      );
    });
  } else {
    return <EmptyBox />;
  }

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="row summary justify-content-center">
          <div className="col-md-4">
            <div className="summary-item mb-5">
              <label htmlFor="">Payment Type</label>
              <label htmlFor="">Provider</label>
              {keys}
            </div>
          </div>
          <div className="col-md-4">
            <div className="summary-item-values mb-5">
              <label htmlFor="">
                {category !== undefined ? category.name : null}
              </label>
              <label htmlFor="">
                {product !== undefined ? product.name : null}
              </label>
              {values}
            </div>
          </div>
        </div>
      </div>
      <Button
        title="Continue"
        disabled={false}
        type="button"
        onContinueProcess={continueProcess}
        addPrevious={true}
        onPreviousProcess={previousProcess}
      />
    </React.Fragment>
  );
};

export { Summary };
