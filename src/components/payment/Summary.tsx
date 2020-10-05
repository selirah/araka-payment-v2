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

  let keys;
  let values;
  if (data !== null || data !== undefined) {
    keys = Object.keys(data.data).map(function (key, index) {
      return (
        <React.Fragment key={index}>
          <label htmlFor="">{key}</label>
        </React.Fragment>
      );
    });

    values = Object.keys(data.data).map(function (key, index) {
      return (
        <React.Fragment key={index}>
          <div className="tag">
            <span className="tag-text">
              <i className="mbri-cash mr-1 icon"></i>
              {data.data[key]}
            </span>
          </div>
        </React.Fragment>
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
            <label htmlFor="">Provider</label>
            {keys}
          </div>
        </div>
        <div className="col-md-6">
          <div className="summary-item-values mb-5">
            <div className="tag">
              <span className="tag-text">
                <i className="mbri-mobile mr-1 icon"></i>
                {category !== undefined ? category.name : null}
              </span>
            </div>
            <div className="tag">
              <span className="tag-text">
                <i className="mbri-cash mr-1 icon"></i>
                {product !== undefined ? product.name : null}
              </span>
            </div>
            {values}
          </div>
        </div>
        {/* {summary} */}
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
