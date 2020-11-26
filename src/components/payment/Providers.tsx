import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
// import { Button } from './Button';
import { Provider } from './Provider';
import {
  setActiveProduct,
  increasePaymentStep,
  setProduct,
  /*decreasePaymentStep*/
  setFormValidError,
  setActiveCategory,
  setCategory,
} from '../../store/payment';
import { Category, Product } from 'src/interfaces';
import { isEmpty } from 'src/helpers/isEmpty';
import { EmptyBox } from './EmptyBox';

type Props = {
  products: Product[];
};

const Providers: React.FC<Props> = ({ products }) => {
  const dispatch: AppDispatch = useDispatch();
  const { activeProduct, categories /*, products*/ } = appSelector(
    (state) => state.payment
  );
  // const [selectedProduct, setSelectedProduct] = useState<number>(activeProduct);
  const [, setSelectedProduct] = useState<number>(activeProduct);

  useEffect(() => {
    dispatch(setFormValidError(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const continueProcess = (): void => {
    dispatch(increasePaymentStep());
  };

  // const previousProcess = (): void => {
  //   dispatch(decreasePaymentStep());
  // };

  const updateSelectedProduct = (productId: number, product: Product): void => {
    dispatch(setActiveProduct(productId));
    dispatch(setProduct(product));
    let cat: Category | undefined = undefined;
    for (let i = 0; i < categories.length; i++) {
      const prods = categories[i].products;
      for (let j = 0; j < prods.length; j++) {
        if (prods[j].productId === product.productId) {
          cat = categories[i];
        }
      }
    }
    dispatch(setActiveCategory(cat!.productCategoryId));
    dispatch(setCategory(cat!));
    continueProcess();
  };

  useEffect(() => {
    setSelectedProduct(activeProduct);
  }, [activeProduct]);

  return (
    <React.Fragment>
      <div className="row display-options">
        {!isEmpty(products) ? (
          products.map((product) => (
            <Provider
              product={product}
              key={product.productId}
              updateSelectedProduct={updateSelectedProduct}
              activeProduct={activeProduct}
            />
          ))
        ) : (
          <EmptyBox />
        )}
      </div>
      {/* <Button
        title="Continue"
        disabled={selectedProduct === 0 ? true : false}
        type="button"
        onContinueProcess={continueProcess}
        addPrevious={false}
        onPreviousProcess={previousProcess}
      /> */}
    </React.Fragment>
  );
};

export { Providers };
