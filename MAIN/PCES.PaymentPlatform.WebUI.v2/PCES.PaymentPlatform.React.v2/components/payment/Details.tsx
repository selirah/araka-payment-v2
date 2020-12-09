import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { AppState } from 'interfaces/AppState';
import { Category } from 'interfaces/Category';
import { Product } from 'interfaces/Product';
import { FormIO } from './Form';
import { increasePaymentStep } from 'store-house/payment/actions';
import { Button } from './Button';

const selectFromStore = createSelector(
  (state: AppState) => state.categories,
  (state: AppState) => state.products,
  (state: AppState) => state.activeCategory,
  (state: AppState) => state.activeProduct,
  (state: AppState) => state.step,
  (categories, products, activeCategory, activeProduct, step) => ({
    categories,
    products,
    activeCategory,
    activeProduct,
    step,
  })
);

const Details: React.FC = () => {
  const dispatch = useDispatch();
  const {
    categories,
    products,
    activeCategory,
    activeProduct,
    step,
  } = useSelector(selectFromStore);

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
          {process.browser ? (
            <FormIO schema={JSON.parse(product?.form)} />
          ) : null}
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
