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

  return (
    <React.Fragment>
      <div className="container">
        <div className="row summary justify-content-center">
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
            </tbody>
          </table>
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
