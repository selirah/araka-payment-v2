import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { AppState } from 'interfaces/AppState';
import { Button } from './Button';
import { Provider } from './Provider';
import {
  setActiveProduct,
  increasePaymentStep,
} from 'store-house/payment/actions';

const selectFromStore = createSelector(
  (state: AppState) => state.activeCategory,
  (state: AppState) => state.activeProduct,
  (state: AppState) => state.products,
  (activeCategory, activeProduct, products) => ({
    activeCategory,
    activeProduct,
    products,
  })
);

const Providers: React.FC = () => {
  const dispatch = useDispatch();
  const { activeProduct, products } = useSelector(selectFromStore);
  const [selectedProduct, setSelectedProduct] = useState<number>(activeProduct);

  const continueProcess = (): void => {
    dispatch(increasePaymentStep());
  };

  const updateSelectedProduct = (productId: number): void => {
    dispatch(setActiveProduct(productId));
  };

  useEffect(() => {
    setSelectedProduct(activeProduct);
  }, [activeProduct]);

  return (
    <React.Fragment>
      <div className="row display-options justify-content-center">
        {products.map((product) => (
          <Provider
            product={product}
            key={product.productId}
            updateSelectedProduct={updateSelectedProduct}
            activeProduct={activeProduct}
          />
        ))}
      </div>
      <Button
        title="Continue"
        disabled={selectedProduct === 0 ? true : false}
        type="button"
        onContinueProcess={continueProcess}
      />
    </React.Fragment>
  );
};

export { Providers };
