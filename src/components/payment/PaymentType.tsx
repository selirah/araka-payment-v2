import React from 'react';
import { Category } from '../../interfaces';

type Prop = {
  category: Category;
  updateSelectedCategory(categoryId: number, category: Category): void;
  activeCategory: number;
};

const PaymentType: React.FC<Prop> = ({
  category,
  updateSelectedCategory,
  activeCategory,
}) => {
  let svg: string = category.image;
  let blob: Blob = new Blob([svg], { type: 'image/svg+xml' });
  let url: string = URL.createObjectURL(blob);

  return (
    <React.Fragment>
      <div className="col-sm-3 text-center option">
        <div
          className={`selectable-item ${
            activeCategory === category.productCategoryId ? 'selected' : null
          }`}
        >
          <img
            src={url}
            alt=""
            onClick={() =>
              updateSelectedCategory(category.productCategoryId, category)
            }
          />
          <h2
            onClick={() =>
              updateSelectedCategory(category.productCategoryId, category)
            }
          >
            {category.name}
          </h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export { PaymentType };
