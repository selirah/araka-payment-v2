import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { i18n } from '../../i18n';
import { FormIO } from './Form';
import {
  increasePaymentStep,
  decreasePaymentStep,
  setFormValidError,
  postFeeRequest,
} from '../../store/payment';
import { Button } from './Button';
import { EmptyBox } from './EmptyBox';
import { isEmpty } from '../../helpers/isEmpty';
import { secure } from '../../utils/secure';
import { Error } from '../common/Error';

const Details: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    category,
    product,
    isFormValidError,
    setRecipientValues,
  } = appSelector((state) => state.payment);
  const locale = localStorage.getItem('i18nextLng');
  const [formError, setFormError] = useState<string>('');
  const [initialValues, setInitialValues] = useState<any>({});

  useEffect(() => {
    localStorage.setItem('isValid', 'false');
    dispatch(setFormValidError(''));
    if (!isEmpty(setRecipientValues) && setRecipientValues !== undefined) {
      setInitialValues({
        BeneficiaryPhoneNumber: setRecipientValues.value,
        StudentId: setRecipientValues.value,
        StudentName: setRecipientValues.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const continueProcess = (): void => {
    const isValid = localStorage.getItem('isValid');
    const orderData = secure.get('orderData');
    if (isValid === 'true') {
      dispatch(increasePaymentStep());
      dispatch(setFormValidError(''));
      dispatch(postFeeRequest(orderData));
    } else {
      dispatch(setFormValidError('Make sure all fields are filled'));
    }
  };

  const previousProcess = (): void => {
    dispatch(decreasePaymentStep());
  };

  useEffect(() => {
    setFormError(isFormValidError);
  }, [isFormValidError]);

  const options = {
    language: locale !== null ? locale : 'en',
    i18n: i18n,
    readOnly: false,
    noAlerts: true,
  };

  const onChange = (submission: any) => {
    submission.data.BeneficiaryPhoneNumber = '1515151515';
    console.log(submission);
    if (submission.isValid) {
      delete submission.changed;
      secure.set('orderData', submission);
      localStorage.setItem('isValid', submission.isValid);
    }
  };

  return (
    <React.Fragment>
      {!isEmpty(formError) ? <Error error={formError} /> : null}
      <div className="row summary justify-content-center pb-0">
        <div className="col-md-6">
          <div className="summary-item-details mb-5">
            <label htmlFor="">Payment type</label>
            <div className="tag">
              {category !== undefined ? category.name : null}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="summary-item-details mb-5">
            <label htmlFor="">Provider</label>
            <div className="tag">
              {product !== undefined ? product.name : null}
            </div>
          </div>
        </div>
      </div>
      <div className="row display-options justify-content-center">
        <div className="col-sm-12">
          {product !== undefined && !isEmpty(product.form) ? (
            <FormIO
              schema={JSON.parse(product.form)}
              options={options}
              onChange={onChange}
              initialValues={initialValues}
            />
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
