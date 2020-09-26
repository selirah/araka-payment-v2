import React from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Button } from './Button';
import {
  increasePaymentStep,
  performingPayment,
} from '../../store/payment/actions';

const Summary: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { category, product } = appSelector((state) => state.payment);

  const data = localStorage.getItem('orderData');
  // const [orderData, setOrderData] = useState(data);

  const continueProcess = (): void => {
    dispatch(increasePaymentStep());
    dispatch(performingPayment(true));
  };

  let summary;
  if (data !== null) {
    const d = JSON.parse(data);
    summary = Object.keys(d.data).map(function (key, index) {
      return (
        <div className="col-md-6" key={index}>
          <div className="summary-item mb-5">
            <label htmlFor="">{key}</label>
            <div className="tag">
              <i className="mbri-target mr-1 icon"></i>
              {/* <img className="image" />  */}
              {d.data[key]}
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <React.Fragment>
      <div className="row summary justify-content-center mt-5">
        <div className="col-md-6">
          <div className="summary-item mb-5">
            <label htmlFor="">Payment type</label>
            <div className="tag">
              <i className="mbri-mobile mr-1 icon"></i>
              {/* <img className="image" />  */}
              {category !== undefined ? category.name : null}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="summary-item mb-5">
            <label htmlFor="">Provider</label>
            <div className="tag">
              <i className="mbri-cash mr-1 icon"></i>
              {/* <img className="image" />  */}
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
      />
    </React.Fragment>
  );
};

export { Summary };
