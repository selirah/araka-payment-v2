import React from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { FormIO } from './Form';
import {
  increasePaymentStep,
  decreasePaymentStep,
} from '../../store/payment/actions';
import { Button } from './Button';
import { EmptyBox } from './EmptyBox';
import { isEmpty } from '../../helpers/isEmpty';

const Details: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { category, product } = appSelector((state) => state.payment);

  const continueProcess = (): void => {
    dispatch(increasePaymentStep());
  };

  const previousProcess = (): void => {
    dispatch(decreasePaymentStep());
  };

  return (
    <React.Fragment>
      <div className="row summary justify-content-center pb-0">
        <div className="col-md-6">
          <div className="summary-item-details mb-5">
            <label htmlFor="">Payment type</label>
            <div className="tag">
              {/* <img className="image" /> */}
              {category !== undefined ? category.name : null}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="summary-item-details mb-5">
            <label htmlFor="">Provider</label>
            <div className="tag">
              {/* <img className="image" /> */}
              {product !== undefined ? product.name : null}
            </div>
          </div>
        </div>
      </div>
      <div className="row display-options justify-content-center pt-0">
        <div className="col-sm-12">
          {product !== undefined && !isEmpty(product.form) ? (
            <FormIO schema={JSON.parse(product.form)} />
          ) : (
            <EmptyBox />
          )}
        </div>
      </div>

      <Button
        title="Continue"
        disabled={
          product !== undefined && !isEmpty(product.form) ? false : true
        }
        type="button"
        onContinueProcess={continueProcess}
        addPrevious={true}
        onPreviousProcess={previousProcess}
      />
    </React.Fragment>
  );
};

export { Details };
