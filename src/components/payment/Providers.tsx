import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Button } from './Button';
import { Provider } from './Provider';
import {
  setActiveProduct,
  increasePaymentStep,
  setProduct,
  decreasePaymentStep,
} from '../../store/payment';
import { Product } from 'src/interfaces';

const Providers: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { activeProduct, products } = appSelector((state) => state.payment);
  const [selectedProduct, setSelectedProduct] = useState<number>(activeProduct);

  const continueProcess = (): void => {
    dispatch(increasePaymentStep());
  };

  const previousProcess = (): void => {
    dispatch(decreasePaymentStep());
  };

  const updateSelectedProduct = (productId: number, product: Product): void => {
    dispatch(setActiveProduct(productId));
    dispatch(setProduct(product));
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
        addPrevious={true}
        onPreviousProcess={previousProcess}
      />
    </React.Fragment>
  );
};

export { Providers };
