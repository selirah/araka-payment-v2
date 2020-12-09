import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { AppState } from 'interfaces/AppState';
import { Category } from 'interfaces/Category';
import { PaymentType } from './PaymentType';
import { Button } from './Button';
import {
  setActiveCategory,
  increasePaymentStep,
  fetchProducts,
} from 'store-house/payment/actions';

type Props = {
  categories: Category[];
};

const selectFromStore = createSelector(
  (state: AppState) => state.activeCategory,
  (activeCategory) => ({ activeCategory })
);

const PaymentTypes: React.FC<Props> = ({ categories }) => {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector(selectFromStore);
  const [selectedCategory, setSelectedCategory] = useState<number>(
    activeCategory
  );

  const updateSelectedCategory = (categoryId: number): void => {
    dispatch(setActiveCategory(categoryId));
    // fetch products under category
    let cat = categories.find(
      (category) => category.productCategoryId === categoryId
    );
    if (cat !== undefined) {
      dispatch(fetchProducts(cat.products));
    } else {
      console.log('no products available');
    }
  };

  const continueProcess = (): void => {
    dispatch(increasePaymentStep());
  };

  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  return (
    <React.Fragment>
      <div className="row display-options justify-content-center">
        {categories.map((category) => (
          <PaymentType
            category={category}
            key={category.productCategoryId}
            updateSelectedCategory={updateSelectedCategory}
            activeCategory={activeCategory}
          />
        ))}
      </div>
      <Button
        title="Continue"
        disabled={selectedCategory === 0 ? true : false}
        type="button"
        onContinueProcess={continueProcess}
      />
    </React.Fragment>
  );
};

export { PaymentTypes };
