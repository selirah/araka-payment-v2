<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Category } from '../../interfaces';
import { PaymentType } from './PaymentType';
import { EmptyBox } from './EmptyBox';
import { Button } from './Button';
import {
  setActiveCategory,
  increasePaymentStep,
  fetchProducts,
  setCategory,
  decreasePaymentStep,
} from '../../store/payment';
import { isEmpty } from 'src/helpers/isEmpty';

type Props = {
  categories: Category[];
};

const PaymentTypes: React.FC<Props> = ({ categories }) => {
  const dispatch: AppDispatch = useDispatch();
  const { activeCategory } = appSelector((state) => state.payment);
  const [selectedCategory, setSelectedCategory] = useState<number>(
    activeCategory
  );

  const updateSelectedCategory = (
    categoryId: number,
    category: Category
  ): void => {
    dispatch(setActiveCategory(categoryId));
    dispatch(setCategory(category));
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

  const previousProcess = (): void => {
    dispatch(decreasePaymentStep());
  };

  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  return (
    <React.Fragment>
      <div className="row display-options justify-content-center all-listings">
        {!isEmpty(categories) ? (
          categories.map((category) => (
            <PaymentType
              category={category}
              key={category.productCategoryId}
              updateSelectedCategory={updateSelectedCategory}
              activeCategory={activeCategory}
            />
          ))
        ) : (
          <EmptyBox />
        )}
      </div>
      <Button
        title="Continue"
        disabled={selectedCategory === 0 ? true : false}
        type="button"
        onContinueProcess={continueProcess}
        addPrevious={false}
        onPreviousProcess={previousProcess}
      />
    </React.Fragment>
  );
};

export { PaymentTypes };
=======
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Category } from '../../interfaces';
import { PaymentType } from './PaymentType';
import { EmptyBox } from './EmptyBox';
import { Button } from './Button';
import {
  setActiveCategory,
  increasePaymentStep,
  fetchProducts,
  setCategory,
  decreasePaymentStep,
} from '../../store/payment';
import { isEmpty } from 'src/helpers/isEmpty';

type Props = {
  categories: Category[];
};

const PaymentTypes: React.FC<Props> = ({ categories }) => {
  const dispatch: AppDispatch = useDispatch();
  const { activeCategory } = appSelector((state) => state.payment);
  const [selectedCategory, setSelectedCategory] = useState<number>(
    activeCategory
  );

  const updateSelectedCategory = (
    categoryId: number,
    category: Category
  ): void => {
    dispatch(setActiveCategory(categoryId));
    dispatch(setCategory(category));
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

  const previousProcess = (): void => {
    dispatch(decreasePaymentStep());
  };

  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  return (
    <React.Fragment>
      <div className="row display-options justify-content-center all-listings">
        {!isEmpty(categories) ? (
          categories.map((category) => (
            <PaymentType
              category={category}
              key={category.productCategoryId}
              updateSelectedCategory={updateSelectedCategory}
              activeCategory={activeCategory}
            />
          ))
        ) : (
          <EmptyBox />
        )}
      </div>
      <Button
        title="Continue"
        disabled={selectedCategory === 0 ? true : false}
        type="button"
        onContinueProcess={continueProcess}
        addPrevious={false}
        onPreviousProcess={previousProcess}
      />
    </React.Fragment>
  );
};

export { PaymentTypes };
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
