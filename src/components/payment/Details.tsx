import React from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Category, Product } from '../../interfaces';
import { FormIO } from './Form';
import { increasePaymentStep } from '../../store/payment/actions';
import { Button } from './Button';

const Details: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { categories, products, activeCategory, activeProduct } = appSelector(
    (state) => state.payment
  );

  let product: Product | undefined, category: Category | undefined;

  category = categories.find((c) => c.productCategoryId === activeCategory);
  product = products.find((p) => p.productId === activeProduct);

  const continueProcess = (): void => {
    dispatch(increasePaymentStep());
  };

  return (
    <React.Fragment>
      <div className="row summary justify-content-center pb-0">
        <div className="col-md-6">
          <div className="summary-item mb-5">
            <label htmlFor="">Payment type</label>
            <div className="tag">
              <i className="mbri-mobile mr-1 icon"></i>
              {/* <img className="image" /> */}
              {category !== undefined ? category.name : null}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="summary-item mb-5">
            <label htmlFor="">Provider</label>
            <div className="tag">
              <i className="mbri-cash mr-1 icon"></i>
              {/* <img className="image" /> */}
              {product !== undefined ? product.name : null}
            </div>
          </div>
        </div>
      </div>
      <div className="row display-options justify-content-center pt-0">
        <div className="col-sm-12">
          <FormIO schema={JSON.parse(product?.form)} />
        </div>
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

export { Details };
