import React, { useState, useEffect } from 'react';
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
import { Fee } from '../../interfaces';
import { EmptyBox } from './EmptyBox';
import { filter } from '../../helpers/filter';
import moment from 'moment';
import { Spinner } from './Spinner';
import { NoFee } from './NoFee';

const Summary: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    category,
    product,
    feeLoading,
    fee,
    repeatTransaction,
    transaction,
  } = appSelector((state) => state.payment);
  const data: any = secure.get('orderData');
  const [loading, setLoading] = useState<boolean>(false);
  const [feeData, setFeeData] = useState<Fee | undefined>(undefined);

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

  useEffect(() => {
    setLoading(feeLoading);
    setFeeData(fee);
  }, [feeLoading, fee]);

  let summary: React.ReactNode;
  if (data !== null || data !== undefined) {
    summary = Object.keys(data.data).map(function (key, index) {
      const { value, selectLabel, isDate } = filter(
        product!,
        key,
        data.data[key]
      );
      let v;
      if (isDate) {
        v = moment(data.data[key]).format('MMMM D, YYYY (h:mm a)');
      } else {
        v = data.data[key];
      }
      return (
        <React.Fragment key={index}>
          {!value ? (
            <tr>
              <td>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
              <td>{selectLabel !== '' ? selectLabel : v}</td>
            </tr>
          ) : null}
        </React.Fragment>
      );
    });
  } else {
    return <EmptyBox />;
  }

  let feeRender: React.ReactNode | number, VATRender: React.ReactNode | number;

  switch (repeatTransaction) {
    case true:
      if (transaction !== undefined) {
        feeRender = transaction.charge;
        VATRender = transaction.vat;
      }
      break;
    case false:
      if (loading && feeData === undefined) {
        feeRender = <Spinner />;
        VATRender = <Spinner />;
      } else if (!loading && feeData === undefined) {
        feeRender = <NoFee message="Could not calculate fee" />;
        VATRender = <NoFee message="Could not calculate VAT" />;
      } else {
        feeRender = feeData!.fee;
        VATRender = feeData!.vat;
      }
      break;
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row summary justify-content-center">
          <h2>Please Review Your Payment Details</h2>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>Payment Type</td>
                <td>{category !== undefined ? category.name : null}</td>
              </tr>
              <tr>
                <td>Provider</td>
                <td>{product !== undefined ? product.name : null}</td>
              </tr>
              {summary}
              <tr>
                <td>Fee</td>
                <td>{feeRender}</td>
              </tr>
              <tr>
                <td>VAT</td>
                <td>{VATRender}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Button
        title="Continue"
        disabled={false}
        type="button"
        onContinueProcess={continueProcess}
        addPrevious={repeatTransaction ? false : true}
        onPreviousProcess={previousProcess}
      />
    </React.Fragment>
  );
};

export { Summary };
