import React from 'react';
import { Product } from '../../interfaces';

type Prop = {
  product: Product;
  updateSelectedProduct(productId: number): void;
  activeProduct: number;
};

const Provider: React.FC<Prop> = ({
  product,
  updateSelectedProduct,
  activeProduct,
}) => {
  return (
    <React.Fragment>
      <div className="col-sm-3 text-center option">
        <div
          className={`selectable-item ${
            activeProduct === product.productId ? 'selected' : null
          }`}
        >
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt=""
            onClick={() => updateSelectedProduct(product.productId)}
          />
          <h2 onClick={() => updateSelectedProduct(product.productId)}>
            {product.name}
          </h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export { Provider };
