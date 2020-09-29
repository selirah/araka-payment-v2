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

  let summary;
  if (data !== null || data !== undefined) {
    summary = Object.keys(data.data).map(function (key, index) {
      return (
        <div className="col-md-6" key={index}>
          <div className="summary-item mb-5">
            <label htmlFor="">{key}</label>
            <div className="tag">
              <i className="mbri-target mr-1 icon"></i>
              {data.data[key]}
            </div>
          </div>
        </div>
      );
    });
  } else {
    return <EmptyBox />;
  }

  return (
    <React.Fragment>
      <div className="row summary justify-content-center mt-5">
        <div className="col-md-6">
          <div className="summary-item mb-5">
            <label htmlFor="">Payment type</label>
            <div className="tag">
              <i className="mbri-mobile mr-1 icon"></i>
              {category !== undefined ? category.name : null}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="summary-item mb-5">
            <label htmlFor="">Provider</label>
            <div className="tag">
              <i className="mbri-cash mr-1 icon"></i>
              {product !== undefined ? product.name : null}
            </div>
          </div>
        </div>
        {summary}
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
