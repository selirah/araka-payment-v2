import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Category, Product } from '../../interfaces';
import { processOrderRequest } from '../../store/payment';
import { SmallIcon } from '../common/Styles';

const Summary: React.FC = () => {
  const dispatch = useDispatch();
  const {
    categories,
    products,
    activeCategory,
    activeProduct,
    orderData,
    isSubmit,
  } = appSelector((state) => state.payment);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  let product: Product | undefined, category: Category | undefined;

  category = categories.find((c) => c.productCategoryId === activeCategory);
  product = products.find((p) => p.productId === activeProduct);

  // const continueProcess = (): void => {
  //   dispatch(increasePaymentStep());
  // };

  useEffect(() => {
    setIsProcessing(isSubmit);
  }, [isSubmit]);

  const onSubmit = () => {
    // dispatch(processOrder(orderData));
    delete orderData.changed;
    orderData.data.Amount = parseInt(orderData.data.Amount);
    console.log(orderData);

    (async () => {
      const rawResponse = await fetch(
        'https://pcessppappserverdev01.eastus.cloudapp.azure.com/api/payments/processrequest',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcmluemVlZHdhcmRAZ21haWwuY29tIiwiZW1haWwiOiJwcmluemVlZHdhcmRAZ21haWwuY29tIiwianRpIjoiNDU1ZjVmOWUtNjJmNy00ZjViLThkMmMtYWFjMmFlMWY2NzdlIiwiZXhwIjoxNjAxMDY5MTcxLCJpc3MiOiJwcm94eXBheS5jb20iLCJhdWQiOiJwcm94eXBheS5jb20ifQ.2xH_iheiZ4Y_v4b8WPcSoqmJRTo9tOSpBsUfWWmWtcg`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        }
      );
      const content = await rawResponse.json();
      window.location.href = content.order.orderURL;
    })();
  };

  const summary = Object.keys(orderData.data).map(function (key, index) {
    return (
      <div className="col-md-6" key={index}>
        <div className="summary-item mb-5">
          <label htmlFor="">{key}</label>
          <div className="tag">
            <i className="mbri-target mr-1 icon"></i>
            {/* <img className="image" />  */}
            {orderData.data[key]}
          </div>
        </div>
      </div>
    );
  });

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
      <div className="row justify-content-center option-submit">
        <button
          type="button"
          className="btn option-submit-button"
          onClick={onSubmit}
        >
          Make Payment{' '}
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

export { Summary };
